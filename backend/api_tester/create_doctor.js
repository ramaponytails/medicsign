const conf = require(`./config.json`);
const axios = require(`axios`);

const payload = {
  email: `joeljelek`,
  name: `Juan Carlo Vieri`,
  hospital: `Bagus`,
  password: `ahlikecil`,
};

async function run() {
  try {
    const res = await axios.post(
      `http://localhost:${conf.port}/doctor/create`,
      payload
    );
    console.log(`Success!`);
    console.log(res.data);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

run();
