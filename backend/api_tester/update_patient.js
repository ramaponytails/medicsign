const axios = require(`axios`);

const payload = {
  _id: `63de55e41253aa8659266419`,
  email: `juan.c.vieri.3223232@gmail.com`,
  gender: `male`,
  name: `Juan Carlo Vieri`,
  date_birth: 92138471982,
  public_key: `testesdfd`
}

async function run() {
  try {
    const res = await axios.post(`http://localhost:3000/patient/update`, payload);
    console.log(`Success!`);
    console.log(res.data);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

run();