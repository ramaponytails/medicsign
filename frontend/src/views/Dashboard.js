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

import PatientForm from "forms/CreatePatient";
import Login from "login/Login";
import useToken from "app/App";

function Dashboard() {
  const { token, setToken } = useToken();

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
            <Login setToken={setToken} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
