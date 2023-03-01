import React, { useState } from "react";

const getToken = () => {
  const tokenString = sessionStorage.getItem("token");
  if (tokenString !== "undefined") {
    const userToken = JSON.parse(tokenString);
    return userToken?.token;
  } else {
    return "";
  }
};

const saveToken = (userToken) => {
  if (userToken !== "undefined") {
    sessionStorage.setItem("token", JSON.stringify(userToken));
    setToken(userToken.token);
  }
};

const isLoggedIn = () => {
  return getToken() ? true : false;
};

const purgeToken = () => {
  sessionStorage.removeItem("token");
};

// export string to Uint8 format
const toUint8 = (data) => {
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
  const exported = await window.crypto.subtle.exportKey("pkcs8", key);
  return exportUint8(exported);
}

async function createRSA() {
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
  const rawPrivate = await exportPrivateKey(keyPair.privateKey);
  const rawPublic = await exportPublicKey(keyPair.publicKey);
  sessionStorage.setItem("privateKey", JSON.stringify(rawPrivate));
  sessionStorage.setItem("publicKey", JSON.stringify(rawPublic));
}

async function saveRSA(keys) {
  if (keys.publicKey && keys.privateKey) {
    sessionStorage.setItem("privateKey", JSON.stringify(keys.publicKey));
    sessionStorage.setItem("publicKey", JSON.stringify(keys.privateKey));
  }
}

const getPublic = () => {
  const publicKeyString = sessionStorage.getItem("publicKey");
  if (publicKeyString !== "undefined") {
    const userKey = JSON.parse(publicKeyString);
    return userKey?.publicKey;
  }
};

const getPrivate = () => {
  const privateKeyString = sessionStorage.getItem("privateKey");
  if (privateKeyString !== "undefined") {
    const userKey = JSON.parse(privateKeyString);
    return userKey?.privateKey;
  }
};

async function signRSA(data) {
  const encoded = toUint8(data);
  const signature = await window.crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    getPrivate(),
    encoded
  );
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

export {
  getToken,
  saveToken,
  isLoggedIn,
  purgeToken,
  createRSA,
  saveRSA,
  getPublic,
  getPrivate,
  signRSA,
  verifyRSA,
};
