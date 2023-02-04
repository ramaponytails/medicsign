const axios = require(`axios`);

const payload = {
  _id: `63de5676f3d90198eb27e22d`,
}

async function run() {
  try {
    const res = await axios.get(`http://localhost:3000/doctor/view/${payload._id}`);
    console.log(`Success!`);
    console.log(res.data);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

run();