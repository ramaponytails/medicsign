'use strict';

const crypto = require(`crypto`);
const mongoose = require(`mongoose`);
const jwt = require(`jsonwebtoken`);
const bcrypt = require(`bcryptjs`);
const env = process.env;
const { logger } = require(`../middleware/logger`);
const { success, error, sendStatus } = require(`../middleware/req_handler`);
const { Doctor } = require(`../models/doctor`);
const { Record } = require(`../models/record`);
const { Key } = require(`../models/key`);
const { encrypt } = require(`../middleware/encrypt`);
const { decrypt, server_public_key } = require(`../middleware/decrypt`);
const ObjectId = mongoose.Types.ObjectId;

const cmdMap = {
  create,
  view,
  update,
  login,
  list,
};

const doctorSchema = {
  email: `string`,
  name: `string`,
  hospital: `string`,
  password: `string`,
};

function validate(dat) {
  var res = {};
  for (const key in doctorSchema) {
    if (typeof dat[key] !== doctorSchema[key]) return undefined;
    res[key] = dat[key];
  }
  return res;
}

function validate_id(userId) {
  return ObjectId.isValid(userId);
}

async function hash(password) {
  return await bcrypt.hash(password, 10);
}

async function get_refresh(user) {
  return await jwt.sign(
    { userId: user._id, email: user.email },
    env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: `1y`,
    }
  );
}

async function get_access(user) {
  return await jwt.sign(
    { userId: user._id, email: user.email },
    env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: `2h`,
    }
  );
}

async function get_tokens(user) {
  return {
    access_token: await get_access(user),
    refresh_token: await get_refresh(user),
  };
}

async function validate_key(key) {
  try {
    const res = crypto.createPublicKey({
      key: Buffer.from(key, `base64`),
      type: `spki`,
      format: `der`,
    });
    return true;
  } catch (error) {
    return false;
  }
}

async function create(req, res) {
  try {
    var dat = req.body.user;
    dat = validate(dat);
    const { public_key } = req.body;
    if (!dat || !public_key)
      return await sendStatus(res, 400, `Incomplete data.`);
    if (!(await validate_key(public_key)))
      return await sendStatus(res, 400, `Invalid public key format.`);

    dat.password = await hash(dat.password);

    if (await Doctor.countDocuments({ email: dat.email }))
      return await sendStatus(res, 409, `User exists.`);

    const newDoctor = new Doctor(dat);
    await newDoctor.save();

    const newKey = new Key({ userId: newDoctor._id, public_key });
    await newKey.save();

    const tokens = await get_tokens(newDoctor);

    logger.info(`New Doctor saved!`, { dat });

    await success(
      res,
      await encrypt(
        { user: newDoctor, tokens, server_public_key },
        newDoctor._id
      )
    );
  } catch (error) {
    logger.error(`Error saving new doctor.`, { error });
    return await sendStatus(res, 500);
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body.credentials || {};
    const { public_key } = req.body;

    if (!(email && password && public_key)) {
      return await sendStatus(res, 400, `Insufficient data to log in.`);
    }
    if (!(await validate_key(public_key)))
      return await sendStatus(res, 400, `Invalid public key format.`);

    const user = await Doctor.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const userKey = await Key.findOne({ userId: user._id });
      userKey.public_key = public_key;
      await userKey.save();

      const tokens = await get_tokens(user);

      logger.info(`Doctor login success.`);
      return await success(
        res,
        await encrypt({ user, tokens, server_public_key }, user._id)
      );
    }
    logger.info(`Doctor invalid credentials.`);
    return await sendStatus(res, 400, `Invalid credentials.`);
  } catch (error) {
    logger.error(`Error logging doctor in.`, { error });
    return await sendStatus(res, 500);
  }
}

async function view(req, res) {
  const userId = req.params.user;

  try {
    if (
      !userId ||
      !validate_id(userId) ||
      !(await Doctor.countDocuments({ _id: userId }))
    )
      return await sendStatus(res, 404, `Invalid userId.`);

    if (req.user.userId !== userId) {
      return await sendStatus(res, 403);
    }

    const user = await Doctor.findOne({ _id: userId }).exec();
    await success(res, await encrypt({ user }, userId));
  } catch (error) {
    logger.error(`Error viewing doctor.`, { error });
    return await sendStatus(res, 500);
  }
}

async function update(req, res) {
  try {
    var dat = req.body.user;
    const userId = dat._id;
    dat = validate(dat);
    const { public_key } = req.body;

    dat.password = await hash(dat.password);
    if (
      !dat ||
      !public_key ||
      !userId ||
      !validate_id(userId) ||
      !(await Doctor.countDocuments({ _id: userId }))
    )
      return await sendStatus(res, 400, `Incomplete data.`);
    if (!(await validate_key(public_key)))
      return await sendStatus(res, 400, `Invalid public key format.`);

    if (req.user.userId !== userId) {
      return await sendStatus(res, 403);
    }
    if (
      (await Doctor.countDocuments({ email: dat.email })) -
      ((await Doctor.findOne({ _id: userId }).exec()).email === dat.email)
    )
      return await sendStatus(res, 409, `User exists.`);

    const userKey = await Key.findOne({ userId });
    userKey.public_key = public_key;
    await userKey.save();

    await Doctor.findByIdAndUpdate(userId, dat).exec();
    const updatedDoctor = await Doctor.findOne({ _id: userId });

    logger.info(`Doctor updated!`, { dat });

    return await success(res, await encrypt({ user: updatedDoctor }, userId));
  } catch (error) {
    logger.error(`Error updating doctor.`, { error });
    return await sendStatus(res, 500);
  }
}

async function list(req, res) {
  var userId = req.params.user;

  try {
    if (
      !userId ||
      !validate_id(userId) ||
      !(await Doctor.countDocuments({ _id: userId }))
    )
      return await sendStatus(res, 404, `Invalid userId.`);

    if (req.user.userId !== userId) return await sendStatus(res, 403);

    const records = await Record.find({ doctor_id: userId });
    return await success(res, await encrypt({ records }, userId));
  } catch (error) {
    logger.error(`Error retrieving record list.`, { error });
    return await sendStatus(res, 500);
  }
}

async function doctor(req, res) {
  const cmd = req.params.cmd;

  if (!(cmd in cmdMap)) return await sendStatus(res, 404, `Invalid command.`);

  await cmdMap[cmd](req, res);
}

module.exports = cmdMap;
