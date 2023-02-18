const conf = require(`./config.json`);
const axios = require(`axios`);

const payload = {
  credentials: {
    email: `maaatewwjelek`,
    password: `ahlibesar`,
  },
  public_key: `MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsMxsajLeUiQNaCZi3Hk6nNw/C6s3CbuORG/AnYxVFtwpCv0z4t0vS5fTWJcTXnnFmipgxIEDG9tYoYrnH22Z9BA5TxTRAZE+n6Vtpa2MonvhSEeq7oKQaafqHCPd8Ea+7aSRqMiNvP9tHZ2AKDgXz+Sl4SL40HuLjFVHIHJFBngX31OqB3cVDJLOnRRQvvXiwD3+c+yScYYYn1JnzDbWWwRGxF9pl/LeXHn7K9SxYjxgY9o7qAVMeK9Hxa9r7fDhE4RcKpMqQqPsb8h6HJIO9wx0dGPhvBKL4qI4Rs+7RsLZwUis0L2V8y6zekAuoB/wUoylYOh3a8c/9xgauHcmHQIDAQAB`,
};

async function run() {
  try {
    const res = await axios.post(
      `http://localhost:${conf.port}/patient/login`,
      payload
    );
    console.log(`Success!`);
    console.log(res.data);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

run();
