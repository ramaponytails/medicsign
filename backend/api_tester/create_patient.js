const axios = require(`axios`);

const payload = {
  name: `Juan Carlo Vieri`,
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