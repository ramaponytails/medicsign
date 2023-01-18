const axios = require(`axios`);

const payload = {
  email: `juan.c.vieri.32@gmail.com`,
  gender: `male`,
  name: `Juan Carlo Vieri`,
  date_birth: 92138471982,
  public_key: `testesdfd`
}

async function run() {
  try {
    const res = await axios.post(`http://localhost:3000/patient/create`, payload);
    console.log(`Success!`);
    console.log(res.data);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

run();