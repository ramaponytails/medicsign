const winston = require('winston');
require('winston-mongodb');

const env = process.env;

const { format, transports } = winston;

const logFormat = format.printf(
  ({ level, message, timestamp }) => `${timestamp} ${level}: ${message}`
);

const logger = winston.createLogger({
  format: format.combine(format.metadata()),
  transports: [
    new transports.Console({
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
        format.cli(),
        logFormat
      ),
    }),
    new transports.File({
      filename: 'combined.log',
      format: format.combine(format.timestamp(), format.json()),
    }),
    new transports.MongoDB({ db: env.mongodb }),
  ],
});

module.exports = { logger };
