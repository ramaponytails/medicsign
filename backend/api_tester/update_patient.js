const conf = require(`./config.json`);
const axios = require(`axios`);

const payload = {
  user: {
    _id: `63f0f8d1c0b60a1da17f1fb8`,
    email: `matewwwwjelek`,
    gender: `fem11ale`,
    name: `Juan 22 Vieri`,
    date_birth: 9213822471982,
    password: `ahlibesar`,
  },
  public_key: `MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsMxsajLeUiQNaCZi3Hk6nNw/C6s3CbuORG/AnYxVFtwpCv0z4t0vS5fTWJcTXnnFmipgxIEDG9tYoYrnH22Z9BA5TxTRAZE+n6Vtpa2MonvhSEeq7oKQaafqHCPd8Ea+7aSRqMiNvP9tHZ2AKDgXz+Sl4SL40HuLjFVHIHJFBngX31OqB3cVDJLOnRRQvvXiwD3+c+yScYYYn1JnzDbWWwRGxF9pl/LeXHn7K9SxYjxgY9o7qAVMeK9Hxa9r7fDhE4RcKpMqQqPsb8h6HJIO9wx0dGPhvBKL4qI4Rs+7RsLZwUis0L2V8y6zekAuoB/wUoylYOh3a8c/9xgauHcmHQIDAQAB`,
};

const config = {
  headers: {
    "x-access-token":
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2YwZjhkMWMwYjYwYTFkYTE3ZjFmYjgiLCJlbWFpbCI6Im1hYWF0ZXd3amVsZWsiLCJpYXQiOjE2NzY3MzgzOTIsImV4cCI6MTY3Njc0NTU5Mn0.cO8HKrWHVGd0qfbmzICVPtzpr-QMwrBGekaGAjn3Vxk",
  },
};

async function run() {
  try {
    const res = await axios.post(
      `http://localhost:${conf.port}/patient/update`,
      payload,
      config
    );
    console.log(`Success!`);
    console.log(res.data);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

run();
