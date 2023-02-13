'use strict';

const mongoose = require(`mongoose`);
const jwt = require(`jsonwebtoken`);
const bcrypt = require(`bcryptjs`);
const env = process.env;
const { logger } = require(`../logger`);
const { success, error, sendStatus } = require(`../req_handler`);
const { Patient } = require(`../models/patient`);
const ObjectId = mongoose.Types.ObjectId;

const cmdMap = {
  create,
  view,
  update,
  login,
};

const patientSchema = {
  email: `string`,
  gender: `string`,
  name: `string`,
  date_birth: `number`,
  public_key: `string`,
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

async function create(req, res) {
  var dat = req.body;
  dat = validate(dat);
  if (!dat) return await sendStatus(res, 400, `Invalid user.`);
  dat.password = await bcrypt.hash(dat.password, 10);

  try {
    if (await Patient.countDocuments({ email: dat.email }))
      return await sendStatus(res, 409, `User exists.`);

    const newPatient = new Patient(dat);
    newPatient.token = await jwt.sign(
      { userId: newPatient._id, email: dat.email },
      env.TOKEN_KEY,
      { expiresIn: `2h` }
    );
    await newPatient.save();
    logger.info(`New Patient saved!`, { dat });

    await success(res, newPatient);
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
      user.token = await jwt.sign({ userId: user._id, email }, env.TOKEN_KEY, {
        expiresIn: `2h`,
      });
      await user.save();

      return await success(res, user);
    }
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
    await success(res, user);
  } catch (error) {
    logger.error(`Error viewing patient.`, { error });
    return await sendStatus(res, 500);
  }
}

async function update(req, res) {
  var dat = req.body;
  const userId = dat._id;
  dat = validate(dat);
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

    const updatedPatient = await Patient.findByIdAndUpdate(userId, dat).exec();

    logger.info(`Patient updated!`, { dat });

    return await success(res, updatedPatient);
  } catch (error) {
    logger.error(`Error updating patient.`, { error });
    return await sendStatus(res, 500);
  }
}

async function patient(req, res) {
  const cmd = req.params.cmd;

  if (!(cmd in cmdMap)) return await sendStatus(res, 404, `Invalid command.`);

  await cmdMap[cmd](req, res);
}

module.exports = cmdMap;
