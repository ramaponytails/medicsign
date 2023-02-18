const conf = require(`./config.json`);
const axios = require(`axios`);

const payload = {
  patient_id: `63f0f8d1c0b60a1da17f1fb8`,
  doctor_id: `63eb653ec81b61365346d5e5`,
  disease: `2222`,
  diagnosis: `11`,
  created_at: 22,
  signature: `11`,
};

const config = {
  headers: {
    "x-access-token":
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2ViNjUzZWM4MWI2MTM2NTM0NmQ1ZTUiLCJlbWFpbCI6IjExMTExbSIsImlhdCI6MTY3NjczODcyMCwiZXhwIjoxNjc2NzQ1OTIwfQ.WjgKMGCCFpJYoenoYemIOjG0yyzGeDHI-mcfm-jNI1Y",
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
