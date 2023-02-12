const { patient } = require(`./patient/patient`);
const { doctor } = require(`./doctor/doctor`);
const { record } = require(`./record/record`);

module.exports = (app) => {
  app.get(`/`, (req, res) => {
    res.send({ data: `API success!` });
  });

  app.post(`/patient/:cmd`, patient);
  app.get(`/patient/:cmd/:user?`, patient);

  app.post(`/doctor/:cmd`, doctor);
  app.get(`/doctor/:cmd/:user?`, doctor);

  app.post(`/record/:cmd`, record);
  app.get(`/record/:cmd/:record?`, record);
};
