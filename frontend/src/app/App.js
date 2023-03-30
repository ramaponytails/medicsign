import React, { useState } from "react";

// export string to Uint8 format
const toUint8 = (data) => {
  console.log("toUint8");
  console.log(data);
  let encoder = new TextEncoder();
  return encoder.encode(data);
};

// export Uint8 or ArrayBuffer format to Base64 string
const exportUint8 = (data) => {
  const exportedAsString = String.fromCharCode.apply(
    null,
    new Uint8Array(data)
  );
  const exportedAsBase64 = window.btoa(exportedAsString);
  return exportedAsBase64;
};

async function exportPrivateKey(key) {
  const exported = await window.crypto.subtle.exportKey("pkcs8", key);
  return exportUint8(exported);
}

async function exportPublicKey(key) {
  const exported = await window.crypto.subtle.exportKey("spki", key);
  return exportUint8(exported);
}

async function createRSA() {
  console.log("GENERATE");
  const keyPair = await window.crypto.subtle.generateKey(
    {
      name: "RSA-PSS",
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-256",
    },
    true,
    ["sign", "verify"]
  );
  console.log("FINISH");
  console.log(keyPair);
  const rawPrivate = await exportPrivateKey(keyPair.privateKey);
  console.log("Raw Private " + rawPrivate);
  const rawPublic = await exportPublicKey(keyPair.publicKey);
  console.log("Raw Public " + rawPublic);
  sessionStorage.setItem("privateKey", JSON.stringify(rawPrivate));
  sessionStorage.setItem("publicKey", JSON.stringify(rawPublic));
}

async function saveRSA(keys) {
  console.log(keys);
  if (keys.publicKey && keys.privateKey) {
    console.log("save");
    sessionStorage.setItem("privateKey", JSON.stringify(keys.publicKey));
    sessionStorage.setItem("publicKey", JSON.stringify(keys.privateKey));
  }
}

async function getPublic() {
  const publicKeyString = sessionStorage.getItem("publicKey");
  if (publicKeyString !== "undefined") {
    const userKey = JSON.parse(publicKeyString);
    console.log("Public Signature " + userKey);
    return window.crypto.subtle.importKey(
      "spki",
      toUint8(userKey),
      {
        name: "RSA-PSS",
        hash: "SHA-256",
      },
      true,
      ["verify"]
    );
  }
}

async function getPrivate() {
  const privateKeyString = sessionStorage.getItem("privateKey");
  if (privateKeyString !== "undefined") {
    const userKey = JSON.parse(privateKeyString);
    console.log(userKey);
    const uintKey = toUint8(userKey);
    const cryptoKey = await window.crypto.subtle.importKey(
      "pkcs8",
      uintKey,
      {
        name: "RSA-PSS",
        hash: "SHA-256",
      },
      true,
      ["sign"]
    );
    await console.log(cryptoKey);
    return await cryptoKey;
  }
}

async function signRSA(data) {
  const encoded = await toUint8(data);
  await getPrivate();
  console.log("signature");
  const signature = await window.crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    await getPrivate(),
    encoded
  );
  console.log(signature);
  return exportUint8(signature);
}

async function verifyRSA(signature, data) {
  const encoded = toUint8(data);
  const signencoded = toUint8(signature);
  return await window.crypto.subtle.verify(
    "RSASSA-PKCS1-v1_5",
    getPrivate(),
    signencoded,
    encoded
  );
}

export { createRSA, saveRSA, getPublic, getPrivate, signRSA, verifyRSA };
