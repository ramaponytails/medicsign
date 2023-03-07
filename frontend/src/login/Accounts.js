import React, { useState } from "react";
import axios from "axios";

async function isLoggedIn() {
  return true;
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
    console.log(user);
    return user;
  }
}

export { isLoggedIn, saveUser, getUser };
