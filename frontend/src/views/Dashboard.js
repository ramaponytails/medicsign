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

import RecordForm from 'forms/CreateRecord'

function Dashboard() {
  return (
    <>
      <Container>
        <Row>
          <Col>
            <RecordForm />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
