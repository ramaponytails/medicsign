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

function Dashboard() {
  return (
    <>
      <Container>
        <Row>
          <Col>
            <PatientForm />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
