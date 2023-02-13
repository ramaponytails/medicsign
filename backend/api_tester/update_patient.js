const axios = require(`axios`);

const payload = {
  _id: `63ea3956ce6f365a9bcf50ed`,
  email: `juan.c.v22ieri.11@gmail.com`,
  gender: `female`,
  name: `Juan 22 Vieri`,
  date_birth: 9213822471982,
  public_key: `222`,
  password: `lol`,
};

const config = {
  headers: {
    "x-access-token":
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2VhMzk1NmNlNmYzNjVhOWJjZjUwZWQiLCJlbWFpbCI6Imp1YW4uYy52MjJpZXJpLjExQGdtYWlsLmNvbSIsImlhdCI6MTY3NjI5NDQ4NiwiZXhwIjoxNjc2MzAxNjg2fQ.0GZINye5Dd1Y-yve7GyEOLRPYqQkLdZ3k0JODQEhrLg",
  },
};

async function run() {
  try {
    const res = await axios.post(
      `http://localhost:3000/patient/update`,
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
