const conf = require(`./config.json`);
const axios = require(`axios`);

const payload = {
  _id: `63eb653ec81b61365346d5e5`,
  email: `11111m`,
  name: `Juan Carlo Viers22132is`,
  hospital: `hila`,
  password: `ahlibesar`,
};

const config = {
  headers: {
    "x-access-token":
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2ViNjUzZWM4MWI2MTM2NTM0NmQ1ZTUiLCJlbWFpbCI6IjEyMTIxMiIsImlhdCI6MTY3NjM3MTI5NCwiZXhwIjoxNjc2Mzc4NDk0fQ.AHatlN_g5PODT-DpZlQJccHAmVNI9YTTHdbDrN6i_bk",
  },
};

async function run() {
  try {
    const res = await axios.post(
      `http://localhost:${conf.port}/doctor/update`,
      payload,
      config
    );
    console.log(`Success!`);
    console.log(res.data);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

run();
