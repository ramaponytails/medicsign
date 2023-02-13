const axios = require(`axios`);

const payload = {
  _id: `63ea1fee9a789a4196079280`,
};

const config = {
  headers: {
    "x-access-token":
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2VhMWZlZTlhNzg5YTQxOTYwNzkyODAiLCJlbWFpbCI6Imp1YW4uYy52MjJpZXJpLjExQGdtYWlsLmNvbSIsImlhdCI6MTY3NjI5MDU2MywiZXhwIjoxNjc2Mjk3NzYzfQ.MSc-dJMLQvZ8v9ZDDPtt5tuhUU6l-Yz1avnrHIbRIwQ",
  },
};

async function run() {
  try {
    const res = await axios.get(
      `http://localhost:3000/patient/view/${payload._id}`,
      config
    );
    console.log(`Success!`);
    console.log(res.data);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

run();
