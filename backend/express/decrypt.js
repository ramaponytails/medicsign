'use strict';

const crypto = require(`crypto`);
const { success, error, sendStatus } = require(`./req_handler`);
const { Key } = require(`./models/key`);

var { publicKey: server_public_key, privateKey: server_private_key } =
  crypto.generateKeyPairSync(`rsa`, {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: 'spki',
      format: 'der',
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'der',
    },
  });

server_public_key = server_public_key.toString(`base64`);
server_private_key = crypto.createPrivateKey({
  key: server_private_key,
  type: `pkcs8`,
  format: `der`,
});

async function decrypt_aes(enc, key, iv, authTag) {
  key = Buffer.from(key, `base64`);
  iv = Buffer.from(iv, `base64`);
  authTag = Buffer.from(authTag, `base64`);
  const decipher = crypto.createDecipheriv(`aes-256-gcm`, key, iv);
  decipher.setAuthTag(authTag);
  let str = decipher.update(enc, `base64`, `utf8`);
  str += decipher.final(`utf8`);
  return JSON.parse(str);
}

async function decrypt_rsa(data) {
  return JSON.parse(
    await crypto.privateDecrypt(
      {
        key: server_private_key,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: `sha256`,
      },
      Buffer.from(data, `base64`)
    )
  );
}

async function decrypt(encrypted, keys) {
  const { key, iv, authTag } = await decrypt_rsa(keys);

  const decrypted = await decrypt_aes(encrypted, key, iv, authTag);
  return decrypted;
}

module.exports = { server_public_key, decrypt };
