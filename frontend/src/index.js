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

import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";

import routes from "routes.js";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import AdminLayout from "layouts/Admin.js";
import LoginPatient from "login/LoginPatient.js";
import LoginDoctor from "login/LoginDoctor.js";

const root = ReactDOM.createRoot(document.getElementById("root"));

const getRoutes = (routes) => {
  return routes.map((prop, key) => {
    if (prop.layout === "/admin") {
      return (
        <Route
          path={prop.path}
          element={<prop.component />}
          key={key}
        />
      );
    } else {
      return <Route />;
    }
  });
};

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/login/patient" replace />} />
      <Route path="/login/patient" element={<LoginPatient />} />
      <Route path="/login/doctor" element={<LoginDoctor />} />
      <Route element={<AdminLayout />}>{getRoutes(routes)}</Route>
    </Routes>
  </BrowserRouter>
);
