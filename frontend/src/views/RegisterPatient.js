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

function RegisterPatient() {
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

export default RegisterPatient;
