const crypto = require(`crypto`);

var data = [
  {
    _id: "63f04d2d8f638002882ee0dd",
    patient_id: "63f04735bdcd98d77d995fc8",
    doctor_id: "63eb653ec81b61365346d5e5",
    disease: "kangen",
    diagnosis: "jangan",
    created_at: "1972-12-02T10:01:11.982Z",
    signature: "mat",
    __v: 0,
  },
  {
    _id: "63f04d308f638002882ee0e1",
    patient_id: "63f04735bdcd98d77d995fc8",
    doctor_id: "63eb653ec81b61365346d5e5",
    disease: "kangen",
    diagnosis: "jangan",
    created_at: "1972-12-02T10:01:11.982Z",
    signature: "mat",
    __v: 0,
  },
  {
    _id: "63f04d318f638002882ee0e5",
    patient_id: "63f04735bdcd98d77d995fc8",
    doctor_id: "63eb653ec81b61365346d5e5",
    disease: "kangen",
    diagnosis: "jangan",
    created_at: "1972-12-02T10:01:11.982Z",
    signature: "mat",
    __v: 0,
  },
];

data = Buffer.from(JSON.stringify(data));

const key = `MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqLy1Fa7Esgae5+HnW73vAPzr+ir+2VYGA6T9lIdR6FBneDNSWNj3od3B9U3Kx19BYOpqzcwTM9qqWGGAWDgJ1ttqlLrMRuG0VMtPh1TsXogPF4KwX4KVcJW4TD1VAVVamDzIdNxnxlyg1+GtG4niaomdcF95VPkcL17YXRV4DIJgQg9CVXleACo16e+FdNb2Rd2V4W0QZEwGogj/GL/L2VUsNkXVopReS8Jzea5pnVlm6P3P9h2v4V+qmROZl4meHLneynhDUYLZ8D0ZOegEZuDy5A7Qt0iruNbiBzmniNhcPeuxUFP4snCUvA8PAHbvchErvNQHuRiVUmxFweUtxwIDAQAB`;

const public_key = crypto.createPublicKey({
  key: Buffer.from(key, `base64`),
  type: `spki`,
  format: `der`,
});

const signature = Buffer.from(
  `L048LhEIOPGLZvDogtoX+sg4ExLpnKdKhxTWCMGDwyPuq75I/LpXBMuuUEaRSqXcTAiEH0DVrIbemG+ukyN77jw9uOx8oF6B0JctPgwVIspzqdZdFAsZl9Gv93hDGM9KMSWK+mpqxoAroTSg+Pn9b/+at5vZbKr5ATauJDaYDKKiN/kT6GkywyKB/go5co9yduMfWcJJlr0qtSdpHnip5U0asEcUXN+oD7aApea1a+W5fndbLeEjXCgPxDrL0ls5dB1VVSuaZ50Gs7zsKj29YmmGWmaYAYkISy3tX7poPqyCxz8MR/GIszJbGw+P3qGpXWz3+Y6yfeaopnvGZ9NkmQ==`,
  `base64`
);

console.log(crypto.verify(`SHA256`, data, public_key, signature));
