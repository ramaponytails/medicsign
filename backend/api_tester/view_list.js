const conf = require(`./config.json`);
const axios = require(`axios`);

const payload = {
  _id: `63f0f8d1c0b60a1da17f1fb8`,
};

const config = {
  headers: {
    "x-access-token":
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2YwZjhkMWMwYjYwYTFkYTE3ZjFmYjgiLCJlbWFpbCI6Im1hYWF0ZXd3amVsZWsiLCJpYXQiOjE2NzY3Mzc5OTMsImV4cCI6MTY3Njc0NTE5M30.fiFlQ0INCmSvGpf3F_3CsAg6i12alHXI6WJEgIJwDso",
  },
};

async function run() {
  try {
    const res = await axios.get(
      `http://localhost:${conf.port}/patient/list/${payload._id}`,
      config
    );
    console.log(`Success!`);
    console.log(res.data);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

run();
