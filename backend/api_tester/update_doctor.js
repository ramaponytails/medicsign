const axios = require(`axios`);

const payload = {
  _id: `63ea425094da5e1bdb9c2500`,
  email: `juan.c.vier2322@gmail.com`,
  name: `Juan Carlo Vieris`,
  hospital: `hila`,
  password: `ahlibesar`,
};

const config = {
  headers: {
    "x-access-token":
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2VhNDI1MDk0ZGE1ZTFiZGI5YzI1MDAiLCJlbWFpbCI6Imp1YW4uYy52aWVyaS4zMjMyMjJAZ21haWwuY29tIiwiaWF0IjoxNjc2Mjk2ODMzLCJleHAiOjE2NzYzMDQwMzN9.RxnInPSF4Fh5s-pZPp1Jl4CgIf37Gw7e0Dm3TABPLJk",
  },
};

async function run() {
  try {
    const res = await axios.post(
      `http://localhost:3000/doctor/update`,
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
