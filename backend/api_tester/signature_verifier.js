const crypto = require(`crypto`);

var data = {
  _id: "63f0543d4a48782688bc0502",
  patient_id: "63f04735bdcd98d77d995fc8",
  doctor_id: "63f0541a4a48782688bc04e8",
  disease: "kangen",
  diagnosis: "jangan",
  created_at: "1972-12-02T10:01:11.982Z",
  signature: "mat",
  __v: 0,
};

data = Buffer.from(JSON.stringify(data));

const key = `MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqLy1Fa7Esgae5+HnW73vAPzr+ir+2VYGA6T9lIdR6FBneDNSWNj3od3B9U3Kx19BYOpqzcwTM9qqWGGAWDgJ1ttqlLrMRuG0VMtPh1TsXogPF4KwX4KVcJW4TD1VAVVamDzIdNxnxlyg1+GtG4niaomdcF95VPkcL17YXRV4DIJgQg9CVXleACo16e+FdNb2Rd2V4W0QZEwGogj/GL/L2VUsNkXVopReS8Jzea5pnVlm6P3P9h2v4V+qmROZl4meHLneynhDUYLZ8D0ZOegEZuDy5A7Qt0iruNbiBzmniNhcPeuxUFP4snCUvA8PAHbvchErvNQHuRiVUmxFweUtxwIDAQAB`;

const public_key = crypto.createPublicKey({
  key: Buffer.from(key, `base64`),
  type: `spki`,
  format: `der`,
});

const signature = Buffer.from(
  `RVqdb8ZmYoYnl5/nZKntF4nwfqVwF6d5nuQGCrBDDQxQxcvFzz6rS1Wlyrn4k/1q0vtQZXxZKXe5DY8QqOAElDUnixdSQ+lYQ5QYbDlOz5Mpi6ZJIaujaq9sy4bo9zCfzgK+H55jyZ6amv2MLO2KBVUKhLQ5lpvbXB7MY21W/riEBzdMg928UPRMdJbTMXotSZD9obuK24WHmPJj7KqP5/HcWhO+qEiMmALf5W2CFCMxfu/THiWJBnXE1dtXn4enaUAUek8bANMtrqWyC4XlfxknT8Si0EhxZUD2vQShUzeiMLnnUQIMMpmxKIS238nyVb5sHC7xgsEJFS043XhCCA==`,
  `base64`
);

console.log(crypto.verify(`SHA256`, data, public_key, signature));
