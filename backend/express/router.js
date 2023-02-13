const patient = require(`./controllers/patient`);
const { doctor } = require(`./controllers/doctor`);
const { record } = require(`./controllers/record`);
const auth = require(`./auth`);

module.exports = (app) => {
  app.get(`/`, (req, res) => {
    res.send({ data: `API success!` });
  });

  app.post(`/patient/create`, patient.create);
  app.post(`/patient/update`, auth, patient.update);
  app.get(`/patient/view/:user`, auth, patient.view);

  app.post(`/doctor/:cmd`, doctor);
  app.get(`/doctor/:cmd/:user?`, doctor);

  app.post(`/record/:cmd`, record);
  app.get(`/record/:cmd/:record?`, record);
};
