const conf = require(`./config.json`);
const axios = require(`axios`);

const payload = {
  _id: `63ea38e5ce6f365a9bcf50db`,
};

const config = {
  headers: {
    "x-access-token":
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2VhMzhlNWNlNmYzNjVhOWJjZjUwZGIiLCJlbWFpbCI6Imp1YW4uYy52aWVyaS4yMjIxMkBnbWFpbC5jb20iLCJpYXQiOjE2NzYzMDM1NzYsImV4cCI6MTY3NjMxMDc3Nn0.V_AaDL9OME7vTHUZcqOP7V-1VnKE1Z_cxY0wXPHMUEU",
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
