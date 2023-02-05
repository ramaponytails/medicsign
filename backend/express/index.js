const env = process.env;
const express = require(`express`);
const mongoose = require(`mongoose`);
const { logger } = require(`./logger`);
const { success, error } = require(`./req_handler`);
const { patient } = require(`./patient/patient`);
const { doctor } = require(`./doctor/doctor`);
const { record } = require(`./record/record`);

const app = express();
app.use(express.json());

app.get(`/`, (req, res) => {
  res.send({ data: `test` });
});

app.post(`/patient/:cmd`, patient);
app.get(`/patient/:cmd/:user?`, patient);

app.post(`/doctor/:cmd`, doctor);
app.get(`/doctor/:cmd/:user?`, doctor);

app.post(`/record/:cmd`, record);
app.get(`/record/:cmd/:record?`, record);

async function run() {
  await mongoose.connect(env.mongodb);
  logger.info(`Connected to Atlas.`);

  app.listen(env.port, () =>
    logger.info(`Server is listening to port ${env.port}.`)
  );
}

run();
