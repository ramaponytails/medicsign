const conf = require(`./config.json`);
const axios = require(`axios`);
const { decrypt } = require(`./decryptor`);

const payload = {
  user: {
    _id: `63f174b634494a5f16c171de`,
    email: `joeljuelekk`,
    name: `Juan Carlo Viers22132is`,
    hospital: `hila`,
    password: `ahlibesar`,
  },
  public_key: `MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsMxsajLeUiQNaCZi3Hk6nNw/C6s3CbuORG/AnYxVFtwpCv0z4t0vS5fTWJcTXnnFmipgxIEDG9tYoYrnH22Z9BA5TxTRAZE+n6Vtpa2MonvhSEeq7oKQaafqHCPd8Ea+7aSRqMiNvP9tHZ2AKDgXz+Sl4SL40HuLjFVHIHJFBngX31OqB3cVDJLOnRRQvvXiwD3+c+yScYYYn1JnzDbWWwRGxF9pl/LeXHn7K9SxYjxgY9o7qAVMeK9Hxa9r7fDhE4RcKpMqQqPsb8h6HJIO9wx0dGPhvBKL4qI4Rs+7RsLZwUis0L2V8y6zekAuoB/wUoylYOh3a8c/9xgauHcmHQIDAQAB`,
};

const config = {
  headers: {
    "x-access-token":
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2YxNzRiNjM0NDk0YTVmMTZjMTcxZGUiLCJlbWFpbCI6ImpvZWxqdWVsZWtrIiwiaWF0IjoxNjc2NzY4OTA2LCJleHAiOjE2NzY3NzYxMDZ9.kUn797wge8izhUL7CuIQ5690-OE9MmO8ax0UJoMbCmQ",
  },
};

async function run() {
  try {
    const res = await axios.post(
      `http://localhost:${conf.port}/doctor/update`,
      payload,
      config
    );
    console.log(`Success!`);
    const { encrypted, keys } = res.data.data;
    const decrypted = await decrypt(encrypted, keys);
    console.log(decrypted);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

run();
