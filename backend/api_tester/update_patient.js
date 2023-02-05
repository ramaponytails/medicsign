const axios = require(`axios`);

const payload = {
  _id: `63dfa5030f68eabc6acedbfe`,
  email: `juan.c.vieri.12@gmail.com`,
  gender: `female`,
  name: `Juan 22 Vieri`,
  date_birth: 9213822471982,
  public_key: `222`
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