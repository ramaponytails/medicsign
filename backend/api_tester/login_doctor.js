const conf = require(`./config.json`);
const axios = require(`axios`);

const payload = {
  email: `juan.c.vier2322@gmail.com`,
  password: `ahlibesar`,
};

async function run() {
  try {
    const res = await axios.post(
      `http://localhost:${conf.port}/doctor/login`,
      payload
    );
    console.log(`Success!`);
    console.log(res.data);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

run();
