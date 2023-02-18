'use strict';

const crypto = require(`crypto`);
const mongoose = require(`mongoose`);
const jwt = require(`jsonwebtoken`);
const bcrypt = require(`bcryptjs`);
const env = process.env;
const { logger } = require(`../logger`);
const { success, error, sendStatus } = require(`../req_handler`);
const { Patient } = require(`../models/patient`);
const { Record } = require(`../models/record`);
const { Key } = require(`../models/key`);
const sign = require(`../sign`);
const ObjectId = mongoose.Types.ObjectId;

const cmdMap = {
  create,
  view,
  update,
  login,
  list,
};

const patientSchema = {
  email: `string`,
  gender: `string`,
  name: `string`,
  date_birth: `number`,
  // public_key: `string`,
  password: `string`,
};

function validate(dat) {
  var res = {};
  for (const key in patientSchema) {
    if (typeof dat[key] !== patientSchema[key]) return undefined;
    res[key] = dat[key];
  }
  return res;
}

function validate_id(userId) {
  return ObjectId.isValid(userId);
}

async function encrypt(password) {
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

async function create(req, res) {
  var dat = req.body;
  dat = validate(dat);
  if (!dat) return await sendStatus(res, 400, `Invalid user.`);
  dat.password = await encrypt(dat.password);

  try {
    if (await Patient.countDocuments({ email: dat.email }))
      return await sendStatus(res, 409, `User exists.`);

    var { publicKey: public_key, privateKey: private_key } =
      crypto.generateKeyPairSync(`rsa`, {
        modulusLength: 2048,
        publicKeyEncoding: {
          type: 'spki',
          format: 'der',
        },
        privateKeyEncoding: {
          type: 'pkcs8',
          format: 'der',
        },
      });

    public_key = public_key.toString(`base64`);
    private_key = private_key.toString(`base64`);
    dat.public_key = public_key;

    const newPatient = new Patient(dat);
    await newPatient.save();

    const newKey = new Key({ userId: newPatient._id, private_key, public_key });
    await newKey.save();

    const tokens = await get_tokens(newPatient);

    logger.info(`New Patient saved!`, { dat });

    await success(res, { user: newPatient, tokens });
  } catch (error) {
    logger.error(`Error saving new patient.`, { error });
    return await sendStatus(res, 500);
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      return await sendStatus(res, 400, `Insufficient data to log in.`);
    }

    const user = await Patient.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      await user.save();

      const tokens = await get_tokens(user);

      logger.info(`Patient login success.`);
      return await success(res, { user, tokens });
    }
    logger.info(`Patient invalid credentials.`);
    return await sendStatus(res, 400, `Invalid credentials.`);
  } catch (error) {
    logger.error(`Error logging patient in.`, { error });
    return await sendStatus(res, 500);
  }
}

async function view(req, res) {
  const userId = req.params.user;

  try {
    if (
      !userId ||
      !validate_id(userId) ||
      !(await Patient.countDocuments({ _id: userId }))
    )
      return await sendStatus(res, 404, `Invalid userId.`);

    if (req.user.userId !== userId) {
      return await sendStatus(res, 403);
    }

    const user = await Patient.findOne({ _id: userId }).exec();
    await success(res, { user });
  } catch (error) {
    logger.error(`Error viewing patient.`, { error });
    return await sendStatus(res, 500);
  }
}

async function update(req, res) {
  var dat = req.body;
  const userId = dat._id;
  dat = validate(dat);
  dat.password = await encrypt(dat.password);

  try {
    if (
      !dat ||
      !userId ||
      !validate_id(userId) ||
      !(await Patient.countDocuments({ _id: userId }))
    )
      return await sendStatus(res, 400, `Invalid user.`);

    if (req.user.userId !== userId) {
      return await sendStatus(res, 403);
    }

    if (
      (await Patient.countDocuments({ email: dat.email })) -
      ((await Patient.findOne({ _id: userId }).exec()).email === dat.email)
    )
      return await sendStatus(res, 409, `User exists.`);

    await Patient.findByIdAndUpdate(userId, dat).exec();
    const updatedPatient = await Patient.findOne({ _id: userId });

    logger.info(`Patient updated!`, { dat });

    return await success(res, { user: updatedPatient });
  } catch (error) {
    logger.error(`Error updating patient.`, { error });
    return await sendStatus(res, 500);
  }
}

async function list(req, res) {
  var userId = req.params.user;

  try {
    if (
      !userId ||
      !validate_id(userId) ||
      !(await Patient.countDocuments({ _id: userId }))
    )
      return await sendStatus(res, 404, `Invalid userId.`);

    if (req.user.userId !== userId) return await sendStatus(res, 403);

    const records = await Record.find({ patient_id: userId });
    return await success(res, records, await sign(records, userId));
  } catch (error) {
    logger.error(`Error retrieving record list.`, { error });
    return await sendStatus(res, 500);
  }
}

async function patient(req, res) {
  const cmd = req.params.cmd;

  if (!(cmd in cmdMap)) return await sendStatus(res, 404, `Invalid command.`);

  await cmdMap[cmd](req, res);
}

module.exports = cmdMap;
