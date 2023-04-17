/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall 
be included in all copies or substantial portions of the Software.

*/
/* eslint-disable */
import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";

import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";

import {
  SignedInDoctorRoutes,
  SignedInPatientRoutes,
  SignedOutRoutes,
} from "routes.js";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import RecordView from "view_record/ViewSingle.js";
import PatientRecordView from "view_record/PatientViewSingle.js";
import SignedInLayout from "layouts/SignedIn.js";
import SignedOutLayout from "layouts/SignedOut.js";
import { getUser } from "login/Accounts";

const root = ReactDOM.createRoot(document.getElementById("root"));

axios.defaults.withCredentials = true;

const getRoutes = (routes) => {
  return routes.map((prop, key) => {
    return <Route path={prop.path} element={<prop.component />} key={key} />;
  });
};

const Single =
  getUser().type === "Doctor" ? (
    <Route element={<SignedInLayout />}>
      <Route path="record/:id" element={<RecordView />} />
    </Route>
  ) : (
    <Route element={<SignedInLayout />}>
      <Route path="record/:id" element={<PatientRecordView />} />
    </Route>
  );

const SignedInRouter =
  getUser().type === "Doctor" ? (
    <Route element={<SignedInLayout />}>
      {getRoutes(SignedInDoctorRoutes)}
    </Route>
  ) : (
    <Route element={<SignedInLayout />}>
      {getRoutes(SignedInPatientRoutes)}
    </Route>
  );

root.render(
  <BrowserRouter>
    <Routes>
      {Single}
      {SignedInRouter}
      <Route element={<SignedOutLayout />}>{getRoutes(SignedOutRoutes)}</Route>
    </Routes>
  </BrowserRouter>
);
