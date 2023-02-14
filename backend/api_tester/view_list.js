const conf = require(`./config.json`);
const axios = require(`axios`);

const payload = {
  _id: `63eb5dac86b78351d9d6bc43`,
};

const config = {
  headers: {
    "x-access-token":
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2ViNWRhYzg2Yjc4MzUxZDlkNmJjNDMiLCJlbWFpbCI6Imp1YW4uYy52MjJpZXJpLjExQGdtYWlsLmNvbSIsImlhdCI6MTY3NjM3MDg2MCwiZXhwIjoxNjc2Mzc4MDYwfQ.URqM-xIdCB5Iq3zp3f00mVUxBzbJ_CsBVHHRy1Zcg1Y",
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
