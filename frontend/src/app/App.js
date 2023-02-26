import { create } from "domain";
import React, { useState } from "react";
crypto = require("crypto");

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

const createRSA = () => {
  const { privateKey, publicKey } = crypto.generateKeyPair("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: "spki",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs8",
      format: "pem",
    },
  });
  sessionStorage.setItem("privateKey", JSON.stringify(privateKey));
  sessionStorage.setItem("publicKey", JSON.stringify(publicKey));
};

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
  getPublic,
  getPrivate,
};
