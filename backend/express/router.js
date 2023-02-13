const patient = require(`./controllers/patient`);
const doctor = require(`./controllers/doctor`);
const record = require(`./controllers/record`);
const auth = require(`./auth`);

module.exports = (app) => {
  app.get(`/`, (req, res) => {
    res.send({ data: `API success!` });
  });

  app.post(`/patient/create`, patient.create);
  app.post(`/patient/update`, auth, patient.update);
  app.post(`/patient/login`, patient.login);
  app.get(`/patient/view/:user`, auth, patient.view);

  app.post(`/doctor/create`, doctor.create);
  app.post(`/doctor/update`, auth, doctor.update);
  app.post(`/doctor/login`, doctor.login);
  app.get(`/doctor/view/:user`, auth, doctor.view);

  app.post(`/record/create`, auth, record.create);
  app.post(`/record/update`, auth, record.update);
  app.get(`/record/view/:record`, auth, record.view);
};
