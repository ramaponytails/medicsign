const mongoose = require(`mongoose`);
const {logger} = require(`../logger`);
const {success, error, sendStatus} = require(`../req_handler`);
const {Patient} = require(`./db/patient`);
const ObjectId = mongoose.Types.ObjectId;

const cmdMap = {
  create,
  view,
  update,
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

function validate_id(userId) {
  return ObjectId.isValid(userId);
}

async function create(req, res) {
  var dat = req.body;
  dat = validate(dat);
  if (!dat) return sendStatus(res, 400, `Invalid user.`);

  if (await Patient.countDocuments({email: dat.email})) return sendStatus(res, 409, `User exists.`);

  const newPatient = new Patient(dat);
  await newPatient.save();
  logger.info(`New Patient saved!`, {dat});

  await sendStatus(res, 200, `User saved.`);
}

async function view(req, res) {
  const userId = req.params.user;

  if (!userId || !validate_id(userId) || !(await Patient.countDocuments({_id: userId}))) return sendStatus(res, 404, `Invalid userId.`);

  const user = await Patient.findOne({_id: userId}).exec();

  await success(res, user);
}

async function update(req, res) {
  var dat = req.body;
  const userId = dat._id;
  dat = validate(dat);
  if (!dat || !userId || !validate_id(userId) || !(await Patient.countDocuments({_id: userId}))) return sendStatus(res, 400, `Invalid user.`);
  if (await Patient.countDocuments({email: dat.email})) return sendStatus(res, 409, `User exists.`);

  await Patient.findByIdAndUpdate(userId, dat).exec();
  await sendStatus(res, 200, `User updated.`);
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