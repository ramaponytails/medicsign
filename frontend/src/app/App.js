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

async function exportPrivateKey(key) {
  const exported = await window.crypto.subtle.exportKey("pkcs8", key);
  const exportedAsString = String.fromCharCode.apply(
    null,
    new Uint8Array(exported)
  );
  const exportedAsBase64 = window.btoa(exportedAsString);
  return exportedAsBase64;
}

async function exportPublicKey(key) {
  const exported = await window.crypto.subtle.exportKey("spki", key);
  const exportedAsString = String.fromCharCode.apply(
    null,
    new Uint8Array(exported)
  );
  const exportedAsBase64 = window.btoa(exportedAsString);
  return exportedAsBase64;
}

async function createRSA() {
  const keyPair = await window.crypto.subtle.generateKey(
    {
      name: "RSA-OAEP",
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-256",
    },
    true,
    ["encrypt", "decrypt"]
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

export {
  getToken,
  saveToken,
  isLoggedIn,
  purgeToken,
  createRSA,
  saveRSA,
  getPublic,
  getPrivate,
};
