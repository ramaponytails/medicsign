const conf = require(`./config.json`);
const axios = require(`axios`);
const { decrypt } = require(`./decryptor`);

const payload = {
  _id: `63ea4cbc047e56616bcc52bd`,
};

const config = {
  headers: {
    "x-access-token":
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2VhNDI1MDk0ZGE1ZTFiZGI5YzI1MDAiLCJlbWFpbCI6Imp1YW4uYy52aWVyMjMyMkBnbWFpbC5jb20iLCJpYXQiOjE2NzYyOTkzNTYsImV4cCI6MTY3NjMwNjU1Nn0.x0uLlhDLMyqfFGzUD3MvQ9sRKkYmtEGlyYevG8TIYwo",
    "x-refresh-token":
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2YwZjhkMWMwYjYwYTFkYTE3ZjFmYjgiLCJlbWFpbCI6Im1hYWF0ZXd3amVsZWsiLCJpYXQiOjE2NzY3MzgzOTIsImV4cCI6MTcwODI5NTk5Mn0.wQObl-cYR-c93Y-OiZRoi1Z0Qvg17wcuiSILQrdV4nM",
  },
};

async function run() {
  try {
    const res = await axios.get(
      `http://localhost:${conf.port}/refresh`,
      config
    );
    console.log(`Success!`);
    const { encrypted, keys } = res.data.data;
    const decrypted = await decrypt(encrypted, keys);
    console.log(decrypted);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

run();
