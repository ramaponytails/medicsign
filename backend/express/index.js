const env = process.env;
const express = require(`express`);
const mongoose = require(`mongoose`);
const cors = require('cors');
const { logger } = require(`./middleware/logger`);
const { success, error } = require(`./middleware/req_handler`);
const router = require(`./router`);
const cookieParser = require(`cookie-parser`);

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: `http://localhost:${env.FRONTEND_PORT}`,
    methods: ['GET', 'PUT', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token'],
    credentials: true,
    maxAge: 600,
    exposedHeaders: ['*', 'Authorization'],
  })
);

router(app);

async function run() {
  await mongoose.connect(env.mongodb);
  logger.info(`Connected to Atlas.`);

  app.listen(env.port, () =>
    logger.info(`Server is listening to port ${env.BACKEND_PORT}.`)
  );
}

run();
