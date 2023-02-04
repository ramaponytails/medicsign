const mongoose = require(`mongoose`);
const {logger} = require(`../logger`);
const {success, error, sendStatus} = require(`../req_handler`);
const {Doctor} = require(`./db/doctor`);
const ObjectId = mongoose.Types.ObjectId;

const cmdMap = {
  create,
  view,
  update,
};

const doctorSchema = {
  email: `string`,
  name: `string`,
  hospital: `string`,
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

async function create(req, res) {
  var dat = req.body;
  dat = validate(dat);
  try {
    if (!dat) return (await sendStatus(res, 400, `Invalid user.`));

    if (await Doctor.countDocuments({email: dat.email})) return (await sendStatus(res, 409, `User exists.`));

    const newDoctor = new Doctor(dat);

    await newDoctor.save();
    logger.info(`New Doctor saved!`, {dat});

    await sendStatus(res, 200, `User saved.`);

  } catch (error) {
    logger.error(`Error saving new doctor.`, {error});
    return (await sendStatus(res, 500));
  }
}

async function view(req, res) {
  try {
    const userId = req.params.user;

    if (!userId || !validate_id(userId) || !(await Doctor.countDocuments({_id: userId}))) return (await sendStatus(res, 404, `Invalid userId.`));

    const user = await Doctor.findOne({_id: userId}).exec();
    await success(res, user);
  } catch (error) {
    logger.error(`Error viewing doctor.`, {error});
    return (await sendStatus(res, 500));
  }
}

async function update(req, res) {
  var dat = req.body;
  const userId = dat._id;
  dat = validate(dat);
  try {
    if (!dat || !userId || !validate_id(userId) || !(await Doctor.countDocuments({_id: userId}))) return (await sendStatus(res, 400, `Invalid user.`));
    if (await Doctor.countDocuments({email: dat.email})) return (await sendStatus(res, 400, `User exists.`));

    await Doctor.findByIdAndUpdate(userId, dat).exec();

    logger.info(`Doctor updated!`, {dat});

    await sendStatus(res, 200, `User updated.`);

  } catch (error) {
    logger.error(`Error updating doctor.`, {error});
    return (await sendStatus(res, 500));
  }
}

async function doctor(req, res) {
  const cmd = req.params.cmd;

  if (!(cmd in cmdMap)) return (await sendStatus(res, 404, `Invalid command.`));

  await cmdMap[cmd](req, res);
}

module.exports = {doctor};