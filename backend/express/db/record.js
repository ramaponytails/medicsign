const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  patient_id: mongoose.Schema.Types.ObjectId,
  doctor_id: mongoose.Schema.Types.ObjectId,
  disease: String,
  diagnosis: String,
  created_at: Date,
  signature: String,
});

reportSchema.index({}, { unique: true });

const Report = mongoose.model('Report', reportSchema);

module.exports = { Report };
