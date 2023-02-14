const conf = require(`./config.json`);
const axios = require(`axios`);

const payload = {
  _id: `63ea4cbc047e56616bcc52bd`,
};

const config = {
  headers: {
    "x-access-token":
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2VhNDI1MDk0ZGE1ZTFiZGI5YzI1MDAiLCJlbWFpbCI6Imp1YW4uYy52aWVyMjMyMkBnbWFpbC5jb20iLCJpYXQiOjE2NzYyOTkzNTYsImV4cCI6MTY3NjMwNjU1Nn0.x0uLlhDLMyqfFGzUD3MvQ9sRKkYmtEGlyYevG8TIYwo",
  },
};

// const config = {
//   headers: {
//     "x-access-token":
//       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2VhMzk1NmNlNmYzNjVhOWJjZjUwZWQiLCJlbWFpbCI6Imp1YW4uYy52MjJpZXJpLjExQGdtYWlsLmNvbSIsImlhdCI6MTY3NjMwMDY5MywiZXhwIjoxNjc2MzA3ODkzfQ.5zzWKSPQp0NJzG-wEVfyVbmUOURK_HWqxAoTlUVdu80",
//   },
// };

async function run() {
  try {
    const res = await axios.get(
      `http://localhost:${conf.port}/record/view/${payload._id}`,
      config
    );
    console.log(`Success!`);
    console.log(res.data);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

run();
