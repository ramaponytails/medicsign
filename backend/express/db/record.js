const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  patient_id: mongoose.Schema.Types.ObjectId,
  doctor_id: mongoose.Schema.Types.ObjectId,
  disease: String,
  diagnosis: String,
  created_at: Date,
  signature: String,
});

recordSchema.index({}, { unique: true });

const Record = mongoose.model('Record', recordSchema);

module.exports = { Record };
