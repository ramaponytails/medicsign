const axios = require(`axios`);

const payload = {
  _id: `63dfa5030f68eabc6acedbfe`,
};

async function run() {
  try {
    const res = await axios.get(
      `http://localhost:1234/patient/view/${payload._id}`
    );
    console.log(`Success!`);
    console.log(res.data);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

run();
