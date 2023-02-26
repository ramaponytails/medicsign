import React from "react";

/* eslint-disable */
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";

import PatientForm from "forms/RegisterPatient";
import Login from "login/Login";
import { saveToken } from "app/App";

function Dashboard() {
  return (
    <>
      <Container>
        <Row>
          <Col>
            <PatientForm />
          </Col>
        </Row>
        <Row>
          <Col>
            <Login setToken={saveToken} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
