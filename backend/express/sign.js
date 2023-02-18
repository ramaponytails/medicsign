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

// module.exports = async (data, userId) => {
//   data = Buffer.from(JSON.stringify(data));
//   var { private_key } = await Key.findOne({ userId });
//   private_key = crypto.createPrivateKey({
//     key: Buffer.from(private_key, `base64`),
//     type: `pkcs8`,
//     format: `der`,
//   });

//   const signature = crypto.sign(`SHA256`, data, private_key).toString(`base64`);
//   return signature;
// };

async function sign(data, userId) {
  data = Buffer.from(JSON.stringify(data));
  var { public_key } = await Key.findOne({ userId });
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

async function decrypt(data) {
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

module.exports = { server_public_key, server_private_key, sign };
