const conf = require(`./config.json`);
const axios = require(`axios`);

const payload = {
  patient_id: `63f04735bdcd98d77d995fc8`,
  doctor_id: `63f0541a4a48782688bc04e8`,
  disease: `kangen`,
  diagnosis: `jangan`,
  created_at: 92138471982,
  signature: `mat`,
};

const config = {
  headers: {
    "x-access-token":
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2YwNTQxYTRhNDg3ODI2ODhiYzA0ZTgiLCJlbWFpbCI6ImpvZWxqZWxlayIsImlhdCI6MTY3NjY5NDU1NCwiZXhwIjoxNjc2NzAxNzU0fQ.gE9q0k8AVzRM5lD-QifaSkiYOMzw-42eerTrcd2urQ0",
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
