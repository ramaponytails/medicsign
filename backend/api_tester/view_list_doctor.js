const conf = require(`./config.json`);
const axios = require(`axios`);

const payload = {
  _id: `63f0541a4a48782688bc04e8`,
};

const config = {
  headers: {
    "x-access-token":
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2YwNTQxYTRhNDg3ODI2ODhiYzA0ZTgiLCJlbWFpbCI6ImpvZWxqZWxlayIsImlhdCI6MTY3NjY5NDU1NCwiZXhwIjoxNjc2NzAxNzU0fQ.gE9q0k8AVzRM5lD-QifaSkiYOMzw-42eerTrcd2urQ0",
  },
};

async function run() {
  try {
    const res = await axios.get(
      `http://localhost:${conf.port}/doctor/list/${payload._id}`,
      config
    );
    console.log(`Success!`);
    console.log(res.data);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

run();
