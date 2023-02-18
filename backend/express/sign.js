'use strict';

const crypto = require(`crypto`);
const { success, error, sendStatus } = require(`./req_handler`);
const { Key } = require(`./models/key`);

module.exports = async (data, userId) => {
  data = Buffer.from(JSON.stringify(data));
  var { private_key } = await Key.findOne({ userId });
  private_key = crypto.createPrivateKey({
    key: Buffer.from(private_key, `base64`),
    type: `pkcs8`,
    format: `der`,
  });

  const signature = crypto.sign(`SHA256`, data, private_key).toString(`base64`);
  return signature;
};
