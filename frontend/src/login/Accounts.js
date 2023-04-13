import React, { useState } from "react";
import axios from "axios";

async function isLoggedIn() {
  const type_empty = sessionStorage.getItem("type") === null;
  const _id_empty = sessionStorage.getItem("_id") === null;
  if (type_empty || _id_empty) {
    return "false";
  } else {
    return "true";
  }
}

function saveUser(user) {
  // user type and user id
  if (!user.type || !user._id) {
    console.log("User not found");
    return;
  }
  sessionStorage.setItem("type", JSON.stringify(user.type));
  sessionStorage.setItem("_id", JSON.stringify(user._id));
}

function getUser() {
  const type = JSON.parse(sessionStorage.getItem("type"));
  const _id = JSON.parse(sessionStorage.getItem("_id"));
  console.log(type);
  console.log(_id);
  if (type === "undefined" || _id === "undefined") {
    return "User not found";
  } else {
    const user = { type: type, _id: _id };
    return user;
  }
}

export { isLoggedIn, saveUser, getUser };
