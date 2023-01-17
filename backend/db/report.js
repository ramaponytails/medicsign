const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  patient: mongoose.Schema.Types.ObjectId,
  doctor: mongoose.Schema.Types.ObjectId,
  diagnosis: mongoose.Schema.Types.ObjectId,
  created_at: Date,
  signature: String,
});

reportSchema.index({}, { unique: true });

const Report = mongoose.model('Report', reportSchema);

module.exports = { Report };
