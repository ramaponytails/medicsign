const axios = require(`axios`);
const conf = require(`./config.json`);
const payload = {
  _id: `63ea425094da5e1bdb9c2500`,
};

const config = {
  headers: {
    "x-access-token":
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2VhNDI1MDk0ZGE1ZTFiZGI5YzI1MDAiLCJlbWFpbCI6Imp1YW4uYy52aWVyaS4zMjMyMjJAZ21haWwuY29tIiwiaWF0IjoxNjc2Mjk2ODMzLCJleHAiOjE2NzYzMDQwMzN9.RxnInPSF4Fh5s-pZPp1Jl4CgIf37Gw7e0Dm3TABPLJk",
  },
};

async function run() {
  try {
    const res = await axios.get(
      `http://localhost:${conf.port}/doctor/view/${payload._id}`,
      config
    );
    console.log(`Success!`);
    console.log(res.data);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

run();
