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

* The above copyright notice and this permission notice shall be 
included in all copies or substantial portions of the Software.

*/
/* eslint-disable */
import React, { Component } from "react";
import { useLocation, NavLink } from "react-router-dom";

import { Nav } from "react-bootstrap";
import { isLoggedIn, logout } from "login/Accounts";

import logo from "assets/img/reactlogo.png";

function Sidebar({ color, image, routes }) {
  const location = useLocation();
  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  const LogoutButton =
    isLoggedIn() === "true" ? (
      <li>
        <a href="/about" className={"nav-link"} onClick={logout}>
          <p>Logout</p>
        </a>
      </li>
    ) : (
      <></>
    );
  return (
    <div className="sidebar" data-image={image} data-color={color}>
      <div
        className="sidebar-background"
        style={{
          backgroundImage: "url(" + image + ")",
        }}
      />
      <div className="sidebar-wrapper">
        <Nav>
          {routes.map((prop, key) => {
            if (!prop.redirect)
              return (
                <li
                  className={
                    prop.upgrade
                      ? "active active-pro"
                      : activeRoute(prop.layout + prop.path)
                  }
                  key={key}
                >
                  <NavLink
                    to={prop.path}
                    className={({ isActive }) =>
                      "nav-link" + (isActive ? " activated" : "")
                    }
                  >
                    <i className={prop.icon} />
                    <p>{prop.name}</p>
                  </NavLink>
                </li>
              );
            return null;
          })}
          {LogoutButton}
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
