'use strict';

const crypto = require(`crypto`);
const { success, error, sendStatus } = require(`../middleware/req_handler`);
const { Key } = require(`../models/key`);

async function encrypt_aes(data) {
  const key = crypto.randomBytes(32);
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(`aes-256-gcm`, key, iv);

  let encrypted = cipher.update(data, `utf8`, `base64`);
  encrypted += cipher.final(`base64`);

  return {
    encrypted,
    key: key.toString(`base64`),
    iv: iv.toString(`base64`),
    authTag: cipher.getAuthTag().toString(`base64`),
  };
}

async function encrypt_rsa(data, userId) {
  data = Buffer.from(JSON.stringify(data));

  var { public_key } = await Key.findOne({ userId }).exec();
  public_key = crypto.createPublicKey({
    key: Buffer.from(public_key, `base64`),
    type: `spki`,
    format: `der`,
  });

  return await crypto
    .publicEncrypt(
      {
        key: public_key,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: `sha256`,
      },
      data
    )
    .toString(`base64`);
}

async function encrypt(data, userId) {
  data = JSON.stringify(data);

  const { encrypted, key, iv, authTag } = await encrypt_aes(data);

  const keys = await encrypt_rsa({ key, iv, authTag }, userId);

  return { encrypted, keys };
}

module.exports = { encrypt };
