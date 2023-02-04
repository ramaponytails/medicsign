const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  email: String,
  name: String,
  hospital: String,
});

doctorSchema.index({email: 1}, { unique: true });

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = { Doctor };
