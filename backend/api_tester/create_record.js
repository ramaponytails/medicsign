const axios = require(`axios`);

const payload = {
  patient_id: `63de55e41253aa8659266419`,
  doctor_id: `63de5676f3d90198eb27e22d`,
  disease: `kangen`,
  diagnosis: `jangan`,
  created_at: 92138471982,
  signature: `mat`
}

async function run() {
  try {
    const res = await axios.post(`http://localhost:3000/record/create`, payload);
    console.log(`Success!`);
    console.log(res.data);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

run();