const axios = require(`axios`);

const payload = {
  _id: `63c7f2e3293dda5f3c0f1e4a`,
  email: `juan.c.vieri.3@gmail.com`,
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