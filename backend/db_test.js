const mongoose = require(`mongoose`);
const auth = require(`./auth.json`);
const {logger} = require('./logger');

const patient_dat = {
  email: `juan.c.vieri@gmail.com`,
  gender: `male`,
  name: `Juan Carlo Vieri`,
  date_birth: new Date(1131732001000),
  public_key: `opJErhjw9hj98pqjad9fj`
};

const doctor_dat = {
  email: `ahmad.sentosa.ucup@gmail.com`,
  name: `Ahmad Sentosa`,
  gender: `male`,
  hospital: `RUMAH SAKIT JIWA`,
}

const diagnosis_dat = {
  medical_condition: `Kebanyakan tidur.`,
  disease: `turu`,
  hospital_entry: new Date(1672509601000),
  hospital_release: new Date(1673287201000),
}

var report_dat = {
  created_at: new Date(1673287201000),
  signature: `Halo Metal`
}

async function run() {
  await mongoose.connect(auth.mongodb);
  
  logger.info(`DB connected`);




  const {Patient} = require('./db/patient');
  const existingPatient = await Patient.deleteOne(patient_dat).exec();
  const newPatient = new Patient(patient_dat);
  await newPatient.save();
  logger.info(`New Patient saved!`);


  const {Doctor} = require('./db/doctor');
  const existingDoctor = await Doctor.deleteOne(doctor_dat).exec();
  const newDoctor = new Doctor(doctor_dat);
  await newDoctor.save();
  logger.info(`New Doctor saved!`);


  const {Diagnosis} = require('./db/diagnosis');
  const existingDiagnosis = await Diagnosis.deleteOne(diagnosis_dat).exec();
  const newDiagnosis = new Diagnosis(diagnosis_dat);
  await newDiagnosis.save();
  logger.info(`New Diagnosis saved!`);

  const {Report} = require('./db/report');
  report_dat.patient = newPatient._id;
  report_dat.doctor = newDoctor._id;
  report_dat.diagnosis = newDiagnosis._id;
  const existingReport = await Report.deleteOne(report_dat).exec();
  const newReport = new Report(report_dat);
  await newReport.save();
  logger.info(`New Report saved!`);


}

run();