const axios = require(`axios`);

const payload = {
  _id: `63c940fd9b1e75930292428c`,
  email: `juan.c.vier2@gmail.com`,
  gender: `male`,
  name: `Juan Carlo Vieri`,
  hospital: `Manuk akal`,
}

async function run() {
  try {
    const res = await axios.post(`http://localhost:3000/doctor/update`, payload);
    console.log(`Success!`);
    console.log(res.data);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

run();