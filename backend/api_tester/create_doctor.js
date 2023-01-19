const axios = require(`axios`);

const payload = {
  email: `juan.c.vieri.323222@gmail.com`,
  gender: `male`,
  name: `Juan Carlo Vieri`,
  hospital: `Bagus`,
}

async function run() {
  try {
    const res = await axios.post(`http://localhost:3000/doctor/create`, payload);
    console.log(`Success!`);
    console.log(res.data);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

run();