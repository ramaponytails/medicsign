const axios = require(`axios`);

const payload = {
  _id: `63de55e41253aa8659266419`,
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