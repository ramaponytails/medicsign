"use strict";

const crypto = require(`crypto`);
// const { success, error, sendStatus } = require(`./req_handler`);
// const { Key } = require(`./models/key`);

var server_private_key = `MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCwzGxqMt5SJA1oJmLceTqc3D8LqzcJu45Eb8CdjFUW3CkK/TPi3S9Ll9NYlxNeecWaKmDEgQMb21ihiucfbZn0EDlPFNEBkT6fpW2lrYyie+FIR6rugpBpp+ocI93wRr7tpJGoyI28/20dnYAoOBfP5KXhIvjQe4uMVUcgckUGeBffU6oHdxUMks6dFFC+9eLAPf5z7JJxhhifUmfMNtZbBEbEX2mX8t5cefsr1LFiPGBj2juoBUx4r0fFr2vt8OEThFwqkypCo+xvyHockg73DHR0Y+G8EoviojhGz7tGwtnBSKzQvZXzLrN6QC6gH/BSjKVg6Hdrxz/3GBq4dyYdAgMBAAECggEAAUzQ25tkpvTPaW2Q1V9fLDdID7v8/glpnidhN/ddH9DTd2/NtsnFbC2hYaR4wWgtU7kjODFdARKE7Wksp76XVCQIu9liwRDHmwZtJDupY1TRtFrx5D+ZtBaGl5mMQKpQg0WuHDA0r0gEjiQcmg8cM7c8y1ybDki+SbRN1IH/78XP/u7ELcO6IB/AwRZ8AnPQuMXt5Y2jjTNB07ae41XAoiDG5Ab2JlGVpTnND77dZruHjM/Ulk6KHAxOF7+qsJIGi4/pBt8V8QoPWGoUxcF3Kp0bBc3n9YnV4w5fsiGkIwv9NqCxzXIjitoKkUQDWHstJLUXQ5ExZoJfTzkEDe+CqQKBgQDEcCFj3dlAdt6pPB8NBrigvd3oMYfptwQ8m4lJf1uGbTaHJSf3T5bvQIAwqyhNfeez8e7C0Pc/RTi3N9JEljJvAH9AyCIKWPthvICYaI5dwYxNMIPV6R0WfESRbrcycbGw3tryahEmkzzZlkiR6PnrtCJkwfeFTsgmxjT3KbP3qQKBgQDmZ9dr/roWW2xokriQ6WzXdEjM6sTAt/PsO4CN1YZhH722sgUyehSBSxriKT1VRq+gWw16oFx+etLgYm6mZdbok5jTQXJrUp3B6m7e6ZWvIW+GWxClG7YQCkiI9e4pHT60qf3x7Tv1BiAcCllLzBNQsCy8TzGYAnfS+ek7wO1zVQKBgBlKrqHjEHPCWkzD1uOgd+kKSSX6Kpum2r7K79Qst6YJLbocyJaJAs/vKBIcF2ZSzaBXh/xBV3Qn/3NnloUKKZgtIjU/D1LxvfwJfy0gWSQtJVlS48aI6xvYCCQJc0DlbpFtQBdyHJ8w2ebR+KoAqxzz5nG+n5XkXNTRNESWc/txAoGBALxs18O+Abke8z1iIAaCnzxkINVUeauRxK3Ay5Uytj7fkmrCk3WAWRyTq1yhlUMUF7TwQcmzM3FMSQCv/wWd628wpZ6+uzAB1HotmpY6OOuMUIR0HNyqGO5tOnyngymkfQ+Kpd8fwBTV+ZR08ioGrxUhvrQRn+FMw2mKb68qTAYxAoGAX+dJwrtojuGmYcJFFhNVv3ZXJwhxFtO1hJgqECglOGtVqZgBbbLRxHzd8XumvBQtnZRjyrBz8o5VYkthjbbGGXHheep8RuZbXqcR5ha5YzVfelodMePEQq9pqGTOufJmr1Hm4d7IbpcaPsAknzAFOlqIcmut3s005y5eyaaVwXs=`;
// public = MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsMxsajLeUiQNaCZi3Hk6nNw/C6s3CbuORG/AnYxVFtwpCv0z4t0vS5fTWJcTXnnFmipgxIEDG9tYoYrnH22Z9BA5TxTRAZE+n6Vtpa2MonvhSEeq7oKQaafqHCPd8Ea+7aSRqMiNvP9tHZ2AKDgXz+Sl4SL40HuLjFVHIHJFBngX31OqB3cVDJLOnRRQvvXiwD3+c+yScYYYn1JnzDbWWwRGxF9pl/LeXHn7K9SxYjxgY9o7qAVMeK9Hxa9r7fDhE4RcKpMqQqPsb8h6HJIO9wx0dGPhvBKL4qI4Rs+7RsLZwUis0L2V8y6zekAuoB/wUoylYOh3a8c/9xgauHcmHQIDAQAB
server_private_key = crypto.createPrivateKey({
  key: Buffer.from(server_private_key, `base64`),
  type: `pkcs8`,
  format: `der`,
});

// var { publicKey: server_public_key, privateKey: server_private_key } =
//   crypto.generateKeyPairSync(`rsa`, {
//     modulusLength: 2048,
//     publicKeyEncoding: {
//       type: 'spki',
//       format: 'der',
//     },
//     privateKeyEncoding: {
//       type: 'pkcs8',
//       format: 'der',
//     },
//   });

// server_public_key = server_public_key.toString(`base64`);

async function decrypt_aes(enc, key, iv, authTag) {
  key = Buffer.from(key, `base64`);
  iv = Buffer.from(iv, `base64`);
  authTag = Buffer.from(authTag, `base64`);
  const decipher = crypto.createDecipheriv(`aes-256-gcm`, key, iv);
  decipher.setAuthTag(authTag);
  let str = decipher.update(enc, `base64`, `utf8`);
  str += decipher.final(`utf8`);
  return JSON.parse(str);
}

async function decrypt_rsa(data) {
  return JSON.parse(
    await crypto.privateDecrypt(
      {
        key: server_private_key,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: `sha256`,
      },
      Buffer.from(data, `base64`)
    )
  );
}

async function decrypt(encrypted, keys) {
  const { key, iv, authTag } = await decrypt_rsa(keys);

  const decrypted = await decrypt_aes(encrypted, key, iv, authTag);
  return decrypted;
}

// module.exports = {server_public_key, decrypt};

async function test() {
  console.log(
    await decrypt(
      `es6hL/xMO3j8tZeb/jE5VjJJGyfba66n3cnIHy4h4f8eARQKrqOO2Wh5JgEH85d0c4mVdKU3xPE31tLiMYglYdrfSbHWgPItc4fscUq7l7lYA7Rvsz40OAMolJnGhL9ogpRnKEfDJvNcSz9bc2t9chTxYRz09VinMZLp3XyFoCrVuQtrtOPNSgNuwTYK3U+zfdp8BDkonepApwaEu/ava7zTH+urlFdC7lfP9bR7h4kFA9nUxX+ndNqJ/OoTQcNgrRo7p5genoehT+88U1qlcHRIRYCwwPmDZ877Mb0yUetpa7yk2NnK4JsUFXZrl1nv9aGPWJVuHkHXKcunw1DSydo2hJEcg5t2cqvIZa9+dc2lmAYB8YxOALOp6Rfyl9lopYcQwv6qKpNPeZS2f4pORQyBwtX2orM6ny22GWIqqo+bC5zYqVzcUM7+1npv2uvMjNkfwDRt4BQSldG6e6vN4N0uRNIAIoOItjcHn+cgzft92xT1jr64ohC/x9rsSclPrKtAnbaTDMWQMy7YMa9hPZWG/GTWSghGN+bMyPkMRwA86We+t1Hn6n6yyiUVr0kL6zTkjlSv8Vy1JvlqgnWLI15ATogugOa3bi9m76uowrGoDnPUxjh5rZQmfMeJWdkz3XLCKBwMbylVpbScxaVhZcSlGeL/5X7bhNE1eTJmU2RRhSZWDC6epA226bDjES5Lm1Ofhb8w+Aw3WNV1YmZrHHbbpn11OvQ3K5ATp4Ecr1nQgUbnOmaYEkPF7s3KZECfMfuvku69DvNYrtrH8Q26jJad5C1piMk9s5FaLdkVtRIJcafl34lYaQk34kO34mC9HRPluyxBQBPFIkGZ07XqApIMY0gQvwEXCTkRJtrYOfJtL6cKWfbiXZekAZa/e0VtfOu/ztba6rFs7pcyJEs6eH+Vbuop+dMQNjrtu51uRq8xOo2eGwGwlmjSrObfeBKuAD8atqMy5USPFJnG0u2YK0B1a4wvuIrAdqUWylm0s+QJ9ID+7WLbcNiqMBjos+oGmu/AhP2iAaMo09At7ervnGtxLp5i1ogcggp+vY7pplf6gM6lnR0EhQNN7aBBODGMU+dLfrk+fUdPOyXyo/00rz2V4YyM8Rw3ZZCxpfKbwB9nSfqP0NiCQWgGS4O6MhetLqAEw4R/qZeDBWvuWEpDBV44qubDPA==`,
      `fmGPMKHtwI3iUCyOxl8RoRPlgh4rEIv0PEf4qZwN4wzj4PABzhWBJ/q9P/Cix+JtBPw5UHB/xdYJOIztP54IHHt/ll7AEWNJLslo9RawgV33IK82HyJiVKsjHN0TrK94mhBc01E43CV/9ef/iQCqvP8rDwc+LBRdVrvZm9/T+qYYuprPopZDDQTBl3hV3AwT8ZH6ywkc6xq91+cvOLQiJmYqUubUlS+Uk0pZ2oSSFyfpm1Pa7p8S8ZpS7byHn5DAL6HeKkSkDWDHQHVthFx+IhBhG422COBd/KzimtOKPPMKKfHHmbPPJO8F/WLre5fk/KD4WnFnD3i4MeXGLpvGTA==`
    )
  );
}

test();
