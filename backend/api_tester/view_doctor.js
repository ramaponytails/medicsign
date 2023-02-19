const axios = require(`axios`);
const conf = require(`./config.json`);
const { decrypt } = require(`./decryptor`);

const payload = {
  _id: `63f174b634494a5f16c171de`,
};

const config = {
  headers: {
    "x-access-token":
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2YxNzRiNjM0NDk0YTVmMTZjMTcxZGUiLCJlbWFpbCI6ImpvZWxqdWVsZWsiLCJpYXQiOjE2NzY3Njg1MTIsImV4cCI6MTY3Njc3NTcxMn0.B9R6jK2EOHky3Py4HqMUmOWZ5N8eTy4N3GBYcZR6MZY",
  },
};

async function run() {
  try {
    const res = await axios.get(
      `http://localhost:${conf.port}/doctor/view/${payload._id}`,
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
