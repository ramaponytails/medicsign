"use strict";

const crypto = require(`crypto`);

function sign(data, private_key) {
  data = Buffer.from(JSON.stringify(data));
  private_key = crypto.createPrivateKey({
    key: Buffer.from(private_key, `base64`),
    type: `pkcs8`,
    format: `der`,
  });

  const signature = crypto.sign(`SHA256`, data, private_key).toString(`base64`);
  return signature;
}

// async function validate_keys(keys) {
//   try {
//     const { public_key, private_key } = keys;

//     const publicKey = crypto.createPublicKey({
//       key: Buffer.from(public_key, `base64`),
//       type: `spki`,
//       format: `der`,
//     });

//     const privateKey = crypto.createPrivateKey({
//       key: Buffer.from(private_key, `base64`),
//       type: `pkcs8`,
//       format: `der`,
//     });

//     const test_data = Buffer.from(`test_string`);
//     const signature = crypto.sign(`SHA256`, test_data, privateKey);
//     const verified = crypto.verify(`SHA256`, test_data, publicKey, signature);
//     if (!verified) return false;

//     return true;
//   } catch (error) {
//     return false;
//   }
// }

function verify(data, signature, public_key) {
  data = Buffer.from(JSON.stringify(data));
  signature = Buffer.from(signature, `base64`);

  public_key = crypto.createPublicKey({
    key: Buffer.from(public_key, `base64`),
    type: `spki`,
    format: `der`,
  });

  const isVerified = crypto.verify(`SHA256`, data, public_key, signature);

  return isVerified;
}

// module.exports = {sign, validate_keys, verify};

const private_key = `MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC4yZ8yMHjQww+sAtD3KD/GugBfgdgF9uLgfJt9K2uywqJFm4x5t6mA1+lUK82hn9viZUkf7Lhj0XdBIThfXMwE6Q1HJyjzhaSCdpOuVUwrIEGsz2poC5JhZi18wzVgJLcsp+dmFvEEoXUjJunW1LxcIGsU0IoOsVL+wU61jZzu/n3rXVFQJy6Jdi5ZV2SO2h9lvv6aqIqhdl/qLAyZoXTUf3FDfi0C16H9ruUwXyi/16Me21s5KcI9pmulQMPMhZuxSAWkeMmNNQLqTC5AgWch+5E40JIZNk5S6SEeY9sCOU2wqXGs9uxpNJIoNHWMqpQRSpedGF1/XECIrfQwSgO1AgMBAAECggEAUZ1PcDnjaoT0u4rE45zFyk5lkslE8aFw5Ch0/mw6lYoMZMUGXs4FEfCK0A/Gsx9pXQ1SJkUFzaR60OvMu6W/QF30bNw5ZJE+rxaTNHjc+uE00JANlaWiwd0Asy1+uheNRa5k7/yq99od4+gweJ+eD+yLjvZqO4ILP5R+YIaK7Sz8qFDEsGnvrMUX4zvj1icAzk7Kf9oFrWqi9MzEK+L/rP6duhXymWcAFVAE8nHH7HphXAAv37z9iZrcZCs/sRyWM3EWahTx/M/pCsRNdw9Kfj9eUfJkS0nMnZyRpHK37/aOSrn3hR/qIbOXNth2CgwBGthodfwAGPOaXI9c9aFaAwKBgQD7ZVIzb0x8fVTXRUHqal85FF0sbcMUAbQjB77uNhbdVJejaUuKEB8/dTNabMYnEkiB2Weyn6AXHl3jQ9VIy91vnJWtm6GrrYq/ixtVat/CH3uX7Tit/uepgMmUr5Z+D+VIQYP4I8eEEetdvEcj7BY0mMcjFKwDabsdZycNfYtPLwKBgQC8LAFw7IBA/FLBec2XPVRMrG/Rk77U5R7/O2kHTLenCNeZfQkqFaLkwuXNiuU8ZrW7YNQgvXkVR0O0LmRXCxKr3twCnZ1HhfEG5wWCIs3ACq+6Pf0zBJ2vc8swtZsRLBgd/fXZ1vLOB9dFH9tATAYu6tnuYEZ68zJ5yhvcC6GCWwKBgQDLcFwMCZaA67+7kW1dMQWsIGGiMZT7XMGU05DcHuNz6x/neq9Jo/BVnxeWpo3YUoBgrDmxoGGiM83QuzUfevLQfovV+SrkzkSI6x6MijdXVbjj4nHKxIxebD002L9VdrGaPoJ4TSQJKaMpsNJ1LHlvyO7l4bWt8WMd0TsWPLF+uwKBgApmTDYXfAcbat9ygeBH7W7HYO6uQa+2cf4dJHLY1JWQsYm0FVuUEoqeEuFHOeAatRSEB3U/w39fjuhYYAdHf2KsUHB8kYKwbl+5SN6mWcSxUoDyiBnXuXdG6QXqI4XRcAvIS1wcuxKT8FvLpOxqxzS0mhLIk1ycMD/24Y9JvUVdAoGAc22EAVSvHSf96DB/ZKswpgzYNEy4P/9ubYx9oj9LIcE4EeEqRBtpV3M5kA7gnZBtsYpC/WS5yMIhXG9IM3aFWEaDXS49ADDtGcpknM+c1dUH9J8wEm6RpQPCfJ1R0H7uNbNvEz1uPqlAU6dB0ifwhZC6/0K96Obj9GrvWNraPFA=`;
const public_key = `MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuMmfMjB40MMPrALQ9yg/xroAX4HYBfbi4HybfStrssKiRZuMebepgNfpVCvNoZ/b4mVJH+y4Y9F3QSE4X1zMBOkNRyco84WkgnaTrlVMKyBBrM9qaAuSYWYtfMM1YCS3LKfnZhbxBKF1Iybp1tS8XCBrFNCKDrFS/sFOtY2c7v59611RUCcuiXYuWVdkjtofZb7+mqiKoXZf6iwMmaF01H9xQ34tAteh/a7lMF8ov9ejHttbOSnCPaZrpUDDzIWbsUgFpHjJjTUC6kwuQIFnIfuRONCSGTZOUukhHmPbAjlNsKlxrPbsaTSSKDR1jKqUEUqXnRhdf1xAiK30MEoDtQIDAQAB`;
const data = {
  patient_id: "64055557905425d3440696b7",
  doctor_id: "642a96a8f806469815485d55",
  disease: "121212",
  diagnosis: "lul",
  created_at: 22,
};

// const signature = sign(data, private_key);

// console.log(signature);
// console.log(verify(data, signature, public_key));

function generate_pair() {
  const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: "spki",
      format: "der",
    },
    privateKeyEncoding: {
      type: "pkcs8",
      format: "der",
    },
  });

  console.log(
    privateKey.toString(`base64`),
    `\n`,
    publicKey.toString(`base64`)
  );
}

generate_pair();
