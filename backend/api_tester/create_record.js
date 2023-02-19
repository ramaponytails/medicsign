const conf = require(`./config.json`);
const axios = require(`axios`);
const { encrypt } = require(`./encryptor`);
const { decrypt } = require(`./decryptor`);

const payload = {
  patient_id: `63f0f8d1c0b60a1da17f1fb8`,
  doctor_id: `63f174b634494a5f16c171de`,
  disease: `2222`,
  diagnosis: `11`,
  created_at: 22,
  signature: `11`,
};

const config = {
  headers: {
    "x-access-token":
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2YxNzRiNjM0NDk0YTVmMTZjMTcxZGUiLCJlbWFpbCI6ImpvZWxqdWVsZWtrIiwiaWF0IjoxNjc2NzY4OTA2LCJleHAiOjE2NzY3NzYxMDZ9.kUn797wge8izhUL7CuIQ5690-OE9MmO8ax0UJoMbCmQ",
  },
};

// const config = {
//   headers: {
//     "x-access-token":
//       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2VhMzhlNWNlNmYzNjVhOWJjZjUwZGIiLCJlbWFpbCI6Imp1YW4uYy52aWVyaS4yMjIxMkBnbWFpbC5jb20iLCJpYXQiOjE2NzYyOTQ0NjYsImV4cCI6MTY3NjMwMTY2Nn0.qlBx20yFFjMYyV0jyXLg_0NzSQ_B-6jxZR2o-2R1dsg",
//   },
// };

async function run() {
  try {
    const res = await axios.post(
      `http://localhost:${conf.port}/record/create`,
      await encrypt(payload),
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
