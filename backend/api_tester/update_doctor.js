const axios = require(`axios`);

const payload = {
  _id: `63de5676f3d90198eb27e22d`,
  email: `juan.c.vier2322@gmail.com`,
  name: `Juan Carlo Vieris`,
  hospital: `hila`,
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