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

import DoctorForm from "forms/RegisterDoctor";

function RegisterDoctor() {
  return (
    <>
      <Container>
        <Row>
          <Col>
            <DoctorForm />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default RegisterDoctor;
