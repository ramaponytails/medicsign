const conf = require(`./config.json`);
const axios = require(`axios`);
const { decrypt } = require(`./decryptor`);

const payload = {
  _id: `63f174b634494a5f16c171de`,
};

const config = {
  headers: {
    "x-access-token":
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2YxNzRiNjM0NDk0YTVmMTZjMTcxZGUiLCJlbWFpbCI6ImpvZWxqdWVsZWtrIiwiaWF0IjoxNjc2NzY4OTA2LCJleHAiOjE2NzY3NzYxMDZ9.kUn797wge8izhUL7CuIQ5690-OE9MmO8ax0UJoMbCmQ",
  },
};

async function run() {
  try {
    const res = await axios.get(
      `http://localhost:${conf.port}/doctor/list/${payload._id}`,
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
