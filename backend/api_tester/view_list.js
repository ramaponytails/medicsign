const conf = require(`./config.json`);
const axios = require(`axios`);

const payload = {
  _id: `63f04735bdcd98d77d995fc8`,
};

const config = {
  headers: {
    "x-access-token":
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2YwNDczNWJkY2Q5OGQ3N2Q5OTVmYzgiLCJlbWFpbCI6Im1hdGV3amVsZWsiLCJpYXQiOjE2NzY2OTI3MzMsImV4cCI6MTY3NjY5OTkzM30.CFa9kHImIw9kWn_9QolM6ZHcDxFBgHBr_AxgGSa6yD0",
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
