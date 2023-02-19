const conf = require(`./config.json`);
const axios = require(`axios`);
const { decrypt } = require(`./decryptor`);

const payload = {
  _id: `63f0f8d1c0b60a1da17f1fb8`,
};

const config = {
  headers: {
    "x-access-token":
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2YwZjhkMWMwYjYwYTFkYTE3ZjFmYjgiLCJlbWFpbCI6Im1hdGV3d3d3amVsZWsiLCJpYXQiOjE2NzY3NzIzODMsImV4cCI6MTY3Njc3OTU4M30.Zm8kOUxGAjTsxYvQVFvHBYf4nXQjBFDc9fdmmpoDcM0",
  },
};

async function run() {
  try {
    const res = await axios.get(
      `http://localhost:${conf.port}/patient/list/${payload._id}`,
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
