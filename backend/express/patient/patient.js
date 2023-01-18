const mongoose = require(`mongoose`);
const {logger} = require(`../logger`);
const {success, error, sendStatus} = require(`../req_handler`);

const cmdMap = {
  create,
}

async function create(req, res) {
  await success(res, req.body);
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