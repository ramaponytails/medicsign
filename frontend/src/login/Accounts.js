import React, { useState } from "react";
import axios from "axios";

async function isLoggedIn() {
  const res = await axios.get(`http://localhost:3000/islogin`);
  return true;
}

function saveUser(user) {
  // user type and user id
  if (!user.type || !user._id) {
    console.log("User not found");
    return;
  }
  sessionStorage.setItem("type", JSON.stringify(user.type));
  sessionStorage.setItem("id", JSON.stringify(user._id));
}

function getUser() {
  const type = sessionStorage.getItem("type");
  const _id = sessionStorage.getItem("_id");
  if (type === "undefined" || _id === "undefined") {
    return "User not found";
  } else {
    const user = { type: type, _id: _id };
    return user;
  }
}

export { isLoggedIn, saveUser, getUser };
