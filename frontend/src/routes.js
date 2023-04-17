/* eslint-disable */
/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import RegisterPatient from "views/RegisterPatient.js";
import RegisterDoctor from "views/RegisterDoctor.js";
import QRView from "views/ViewQR";
import CreateRecord from "views/CreateRecord.js";
import RecordList from "view_record/ViewList.js";
import PatientRecordList from "view_record/PatientViewList";
import LoginPatient from "login/LoginPatient.js";
import LoginDoctor from "login/LoginDoctor.js";
import Dashboard from "views/Dashboard";
import About from "views/About";

const SignedInDoctorRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/create/record",
    name: "Create Record",
    icon: "nc-icon",
    component: CreateRecord,
  },
  {
    path: "/record",
    name: "Record List",
    icon: "nc-icon",
    component: RecordList,
  },
];

const SignedInPatientRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/record",
    name: "Record List",
    icon: "nc-icon",
    component: PatientRecordList,
  },
  {
    path: "/view/qr",
    name: "QR Code",
    component: QRView,
  },
];

const SignedOutRoutes = [
  {
    path: "/about",
    name: "About Medicsign",
    component: About,
  },
  {
    path: "/register/patient",
    name: "Register Patient",
    icon: "nc-icon",
    component: RegisterPatient,
  },
  {
    path: "/register/doctor",
    name: "Register Doctor",
    icon: "nc-icon",
    component: RegisterDoctor,
  },
  {
    path: "/login/patient",
    name: "Patient Login",
    icon: "nc-icon",
    component: LoginPatient,
  },
  {
    path: "/login/doctor",
    name: "Doctor Login",
    icon: "nc-icon",
    component: LoginDoctor,
  },
];
export { SignedInDoctorRoutes, SignedInPatientRoutes, SignedOutRoutes };
