const axios = require(`axios`);

const payload = {
  _id: `63de645b82b9c7556534543e`,
}

async function run() {
  try {
    const res = await axios.get(`http://localhost:3000/record/view/${payload._id}`);
    console.log(`Success!`);
    console.log(res.data);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

run();