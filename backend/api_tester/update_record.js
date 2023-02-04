const axios = require(`axios`);

const payload = {
  _id: `63de645b82b9c7556534543e`,
  patient_id: `63de55e41253aa8659266419`,
  doctor_id: `63de5676f3d90198eb27e22d`,
  disease: `cepet pulang`,
  diagnosis: `jangan 2`,
  created_at: 92138471982,
  signature: `jo`
}

async function run() {
  try {
    const res = await axios.post(`http://localhost:3000/record/update`, payload);
    console.log(`Success!`);
    console.log(res.data);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

run();