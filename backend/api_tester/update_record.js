const conf = require(`./config.json`);
const axios = require(`axios`);
const { encrypt } = require(`./encryptor`);
const { decrypt } = require(`./decryptor`);

const payload = {
  _id: `63f17ee2b6241c858bd6bc9f`,
  patient_id: `63f0f8d1c0b60a1da17f1fb8`,
  doctor_id: `63f174b634494a5f16c171de`,
  disease: `cepet pulang`,
  diagnosis: `222 2`,
  created_at: 92138471982,
  signature: `jo`,
};

const config = {
  headers: {
    "x-access-token":
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2YxNzRiNjM0NDk0YTVmMTZjMTcxZGUiLCJlbWFpbCI6ImpvZWxqdWVsZWtrIiwiaWF0IjoxNjc2NzcxODA0LCJleHAiOjE2NzY3NzkwMDR9.srZRO_GU9UJ5XXnte9YElOYOCWS7zw5PVCP1FwGuLvY",
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
      `http://localhost:${conf.port}/record/update`,
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
