const axios = require(`axios`);

const payload = {
  _id: `63ea1fee9a789a4196079280`,
  email: `juan.c.vieri.12@gmail.com`,
  gender: `female`,
  name: `Juan 22 Vieri`,
  date_birth: 9213822471982,
  public_key: `222`,
  password: `ahlibesar`,
};

const config = {
  headers: {
    "x-access-token":
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2VhMWZlZTlhNzg5YTQxOTYwNzkyODAiLCJlbWFpbCI6Imp1YW4uYy52MjJpZXJpLjExQGdtYWlsLmNvbSIsImlhdCI6MTY3NjI5MDU2MywiZXhwIjoxNjc2Mjk3NzYzfQ.MSc-dJMLQvZ8v9ZDDPtt5tuhUU6l-Yz1avnrHIbRIwQ",
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
