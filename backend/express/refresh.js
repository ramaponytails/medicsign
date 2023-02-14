'use strict';

const jwt = require(`jsonwebtoken`);
const { success, error, sendStatus } = require(`./req_handler`);
const env = process.env;

async function get_access(user) {
  return await jwt.sign(
    { userId: user.userId, email: user.email },
    env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: `2h`,
    }
  );
}

module.exports = async (req, res, next) => {
  const refresh_token = req.headers[`x-refresh-token`];

  if (!refresh_token) {
    return sendStatus(res, 403, `No token found.`);
  }

  try {
    const decoded = await jwt.verify(refresh_token, env.REFRESH_TOKEN_SECRET);
    const user = decoded;

    const access_token = await get_access(user);
    return success(res, { access_token, refresh_token });
  } catch (error) {
    return sendStatus(res, 401, `Invalid token.`);
  }
};
