"use strict";

const crypto = require(`crypto`);
// const { success, error, sendStatus } = require(`./req_handler`);
// const { Key } = require(`./models/key`);

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

async function encrypt_rsa(data) {
  data = Buffer.from(JSON.stringify(data));

  var public_key = `MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAy8u7OKX8Pvf1+uL8bpZn42Htj1Dvsdnuuwx8cnECQaL3Lu+DqdDi2xH15bRzIUTRMkW0UfHamKaWTUKyv/iOVP84G3wv0EdnL0vhkuXJt+3U8DnB16QwrwHEd06uKHw+10J2nXgmVgCiHMpAmhhFnU3K1shREHHX948jGQ5rM4EmQfk7dExUMoGzgxFHdVbZnJ8HvK03G+iosycflA4gYWTKKqNWYdAArkKtL0mg6eNNZUFAHkjZp+fbRlVh/KKxRRuh0c+arNfK+fgbQOtAOvLEXlrSLoysHMhwq+qS4vmIC0pZ7wjq88/qjOqM4pQqMcXA6nP0a6bfqilI++lGFQIDAQAB`;
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

async function encrypt(data) {
  data = JSON.stringify(data);

  const { encrypted, key, iv, authTag } = await encrypt_aes(data);

  const keys = await encrypt_rsa({ key, iv, authTag });
  return { encrypted, keys };
}

module.exports = { encrypt };

// async function test() {
//   console.log(await encrypt({ a: `test` }, 1));
// }

// test();
