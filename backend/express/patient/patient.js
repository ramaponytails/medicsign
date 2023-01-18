const mongoose = require(`mongoose`);
const {logger} = require(`../logger`);
const {success, error, sendStatus} = require(`../req_handler`);
const {Patient} = require(`./db/patient`);

const cmdMap = {
  create,
}

const patientSchema = {
  email: `string`,
  gender: `string`,
  name: `string`,
  date_birth: `number`,
  public_key: `string`,
};

function validate(dat) {
  var res = {};
  for (const key in patientSchema) {
    if (typeof dat[key] !== patientSchema[key]) return undefined;
    res[key] = dat[key];
  }
  return res;
}

async function create(req, res) {
  dat = req.body;
  dat = validate(dat);
  if (!dat) return sendStatus(res, 400, `Invalid user.`);

  if (await Patient.countDocuments({email: dat.email})) return sendStatus(res, 409, `User exists.`);

  const newPatient = new Patient(dat);
  await newPatient.save();
  logger.info(`New Patient saved!`, {dat});

  await sendStatus(res, 200, `User saved.`);
}

async function patient(req, res) {
  const cmd = req.params.cmd;

  if (!(cmd in cmdMap)) {
    sendStatus(res, 404, `Invalid command.`);
    return;
  }

  await cmdMap[cmd](req, res);
}

module.exports = {patient};