'use strict';

const jwt = require(`jsonwebtoken`);
const { success, error, sendStatus } = require(`./req_handler`);
const env = process.env;

module.exports = (req, res, next) => {
  const token = req.headers[`x-access-token`];

  if (!token) {
    return sendStatus(res, 403, `No token found.`);
  }

  try {
    const decoded = jwt.verify(token, env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
  } catch (error) {
    return sendStatus(res, 401, `Invalid token.`);
  }

  return next();
};
