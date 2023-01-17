const mongoose = require('mongoose');

const diagnosisSchema = new mongoose.Schema({
  report: String,
  disease: String,
  hospital_entry: Date,
  hospital_release: Date,
});

diagnosisSchema.index({}, { unique: true });

const Diagnosis = mongoose.model('Diagnosis', diagnosisSchema);

module.exports = { Diagnosis };
