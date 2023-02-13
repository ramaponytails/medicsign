const conf = require(`./config.json`);
const axios = require(`axios`);

const payload = {
  _id: `63ea3956ce6f365a9bcf50ed`,
  email: `juan.c.v22ieri.11@gmail.com`,
  gender: `female`,
  name: `Juan 22 Vieri`,
  date_birth: 9213822471982,
  public_key: `222`,
  password: `ahlibesar`,
};

const config = {
  headers: {
    "x-access-token":
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2VhMzk1NmNlNmYzNjVhOWJjZjUwZWQiLCJlbWFpbCI6Imp1YW4uYy52MjJpZXJpLjExQGdtYWlsLmNvbSIsImlhdCI6MTY3NjI5NDY5NCwiZXhwIjoxNjc2MzAxODk0fQ.aDWhhMrDOrQ2RyYqKAg2zUg7BbwCHPgFX3jHQtjIbPU",
  },
};

async function run() {
  try {
    const res = await axios.post(
      `http://localhost:${conf.port}/patient/update`,
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
