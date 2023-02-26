'use strict';

const jwt = require(`jsonwebtoken`);
const { success, error, sendStatus } = require(`./req_handler`);
const { logger } = require(`../middleware/logger`);

const env = process.env;

function set_refresh(user, res) {
  const refreshToken = jwt.sign(
    { userId: user._id, email: user.email },
    env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: `7d`,
    }
  );

  try {
    res.cookie(`refreshToken`, refreshToken, {
      httpOnly: true,
      path: `/refresh`,
      sameSite: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  } catch (error) {
    logger.error(`Error setting refresh token as cookie.`, { error });
  }
  return refreshToken;
}

function set_access(user, res) {
  const accessToken = jwt.sign(
    { userId: user._id, email: user.email },
    env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: `2h`,
    }
  );

  try {
    res.cookie(`accessToken`, accessToken, {
      httpOnly: true,
      sameSite: true,
      maxAge: 2 * 60 * 60 * 1000,
    });
  } catch (error) {
    logger.error(`Error setting access token as cookie.`, { error });
  }
  return accessToken;
}

function set_tokens(user, res) {
  return {
    accessToken: set_access(user, res),
    refreshToken: set_refresh(user, res),
  };
}

function auth(req, res, next) {
  const { accessToken } = req.cookies;

  if (!accessToken) {
    return sendStatus(res, 403, `No token found.`);
  }

  try {
    const decoded = jwt.verify(accessToken, env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
  } catch (error) {
    return sendStatus(res, 401, `Invalid token.`);
  }

  return next();
}

function refresh(req, res, next) {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return sendStatus(res, 403, `No token found.`);
  }

  try {
    const decoded = jwt.verify(refreshToken, env.REFRESH_TOKEN_SECRET);
    const user = decoded;

    const tokens = set_tokens({ _id: user.userId, email: user.email }, res);

    return sendStatus(res, 200);
  } catch (error) {
    return sendStatus(res, 401, `Invalid token.`);
  }
}

module.exports = { auth, set_tokens, refresh };
