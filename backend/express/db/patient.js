const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  email: String,
  gender: String,
  name: String,
  date_birth: Date,
  public_key: String,
});

patientSchema.index({ email: 1 }, { unique: true });

const Patient = mongoose.model('Patient', patientSchema);

module.exports = { Patient };
