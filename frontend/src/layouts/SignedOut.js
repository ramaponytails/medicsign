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
import React, { Component } from "react";
import {
  useLocation,
  Outlet,
  Route,
  Routes,
  BrowserRouter,
  Navigate,
} from "react-router-dom";

import AdminNavbar from "components/Navbars/AdminNavbar";
import Footer from "components/Footer/Footer";
import Sidebar from "components/Sidebar/Sidebar";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";
import { isLoggedIn } from "login/Accounts";
import { SignedOutRoutes } from "routes.js";

import sidebarImage from "assets/img/sidebar-3.jpg";

function SignedOutLayout({ children }) {
  const [data, setData] = React.useState(null);
  const [image, setImage] = React.useState(sidebarImage);
  const [color, setColor] = React.useState("black");
  const [hasImage, setHasImage] = React.useState(true);
  let location = useLocation();
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    setData(isLoggedIn());
    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      var element = document.getElementById("bodyClick");
      element.parentNode.removeChild(element);
    }
  }, [location, data]);
  if (!data) {
    return <h1>Loading</h1>;
  } else if (data == "false") {
    return (
      <>
        <div className="wrapper">
          <Sidebar
            color={color}
            image={hasImage ? image : ""}
            routes={SignedOutRoutes}
          />
          <div className="main-panel centered p-1">
            <div className="m-3">
              <Outlet />
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return <Navigate to="/dashboard" replace={true} />;
  }
}

export default SignedOutLayout;
