import React, { useState } from "react";

function ab2str(buf) {
  return window.btoa(String.fromCharCode.apply(null, new Uint8Array(buf)));
}

function str2ab(str) {
  const binaryStr = window.atob(str);
  const len = binaryStr.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryStr.charCodeAt(i);
  }
  return bytes.buffer;
}

async function exportPrivateKey(key) {
  const exported = await window.crypto.subtle.exportKey("pkcs8", key);
  console.log("COMPARE FORMAT CHANGE");
  console.log(exported);
  console.log(str2ab(ab2str(exported)));
  return ab2str(exported);
}

async function exportPublicKey(key) {
  const exported = await window.crypto.subtle.exportKey("spki", key);
  const imported = await window.crypto.subtle.importKey(
    "spki",
    exported,
    {
      name: "RSA-PSS",
      hash: "SHA-256",
    },
    true,
    ["verify"]
  );
  console.log("COMPARE KEY AND IMPORTED");
  console.log(key);
  console.log(imported);
  return ab2str(exported);
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
  sessionStorage.setItem("privateKey", rawPrivate);
  sessionStorage.setItem("publicKey", rawPublic);
}

async function saveRSA(keys) {
  console.log(keys);
  if (keys.publicKey && keys.privateKey) {
    console.log("save");
    sessionStorage.setItem("privateKey", keys.privateKey);
    sessionStorage.setItem("publicKey", keys.publicKey);
  }
}

async function getPublic() {
  const publicKeyString = sessionStorage.getItem("publicKey");
  if (publicKeyString !== "undefined") {
    const userKey = publicKeyString;
    return userKey;
  }
}

async function getPrivate() {
  const privateKeyString = sessionStorage.getItem("privateKey");
  if (privateKeyString !== "undefined") {
    const userKey = privateKeyString;
    return userKey;
  }
}

async function importPublic(key) {
  const bufferKey = str2ab(key);
  console.log(bufferKey);
  try {
    return await window.crypto.subtle.importKey(
      "spki",
      bufferKey,
      {
        name: "RSA-PSS",
        hash: "SHA-256",
      },
      true,
      ["verify"]
    );
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

async function importPrivate(key) {
  const bufferKey = str2ab(key);
  console.log(bufferKey);
  try {
    const cryptoKey = await window.crypto.subtle.importKey(
      "pkcs8",
      bufferKey,
      {
        name: "RSA-PSS",
        hash: "SHA-256",
      },
      true,
      ["sign"]
    );
    console.log(cryptoKey);
    return cryptoKey;
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

function toUint8(str) {
  var uint8array = new TextEncoder("utf-8").encode(str);
  return uint8array;
}

function exportUint8(buf) {
  var utf8string = new TextDecoder().decode(buf);
  return utf8string;
}

async function signRSA(data) {
  const encoded = toUint8(data);
  const signature = await window.crypto.subtle.sign(
    {
      name: "RSA-PSS",
      saltLength: 32,
    },
    await importPrivate(await getPrivate()),
    encoded
  );
  console.log(signature);
  return exportUint8(signature);
}

async function verifyRSA(signature, data) {
  const encoded = toUint8(data);
  const signencoded = toUint8(signature);
  return await window.crypto.subtle.verify(
    "RSA-PSS",
    await importPublic(await getPublic()),
    signencoded,
    encoded
  );
}

export { createRSA, saveRSA, getPublic, getPrivate, signRSA, verifyRSA };
