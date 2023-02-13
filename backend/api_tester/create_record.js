const conf = require(`./config.json`);
const axios = require(`axios`);

const payload = {
  patient_id: `63ea38e5ce6f365a9bcf50db`,
  doctor_id: `63ea425094da5e1bdb9c2500`,
  disease: `kangen`,
  diagnosis: `jangan`,
  created_at: 92138471982,
  signature: `mat`,
};

const config = {
  headers: {
    "x-access-token":
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2VhNDI1MDk0ZGE1ZTFiZGI5YzI1MDAiLCJlbWFpbCI6Imp1YW4uYy52aWVyMjMyMkBnbWFpbC5jb20iLCJpYXQiOjE2NzYyOTkzNTYsImV4cCI6MTY3NjMwNjU1Nn0.x0uLlhDLMyqfFGzUD3MvQ9sRKkYmtEGlyYevG8TIYwo",
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
