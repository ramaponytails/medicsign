const conf = require(`./config.json`);
const axios = require(`axios`);
const { decrypt } = require(`./decryptor`);

const payload = {
  _id: `63f17ee2b6241c858bd6bc9f`,
};

// const config = {
//   headers: {
//     "x-access-token":
//       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2YwNTQxYTRhNDg3ODI2ODhiYzA0ZTgiLCJlbWFpbCI6ImpvZWxqZWxlayIsImlhdCI6MTY3NjY5NDU1NCwiZXhwIjoxNjc2NzAxNzU0fQ.gE9q0k8AVzRM5lD-QifaSkiYOMzw-42eerTrcd2urQ0",
//   },
// };

const config = {
  headers: {
    "x-access-token":
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2YwZjhkMWMwYjYwYTFkYTE3ZjFmYjgiLCJlbWFpbCI6Im1hdGV3d3d3amVsZWsiLCJpYXQiOjE2NzY3NzE1MDUsImV4cCI6MTY3Njc3ODcwNX0.j-1jUWqpLGm8p0wReJKcafnnN4fybiWUc1xZ4mMNLGo",
  },
};

async function run() {
  try {
    const res = await axios.get(
      `http://localhost:${conf.port}/record/view/${payload._id}`,
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
