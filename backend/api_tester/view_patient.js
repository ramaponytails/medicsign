const axios = require(`axios`);

const payload = {
  _id: `63c7f2e3293dda5f3c0f1e4a`,
}

async function run() {
  try {
    const res = await axios.get(`http://localhost:3000/patient/view/${payload._id}`);
    console.log(`Success!`);
    console.log(res.data);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

run();