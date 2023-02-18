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

import RecordView from "forms/ViewRecord";

function Icons() {
  return (
    <>
      <Container>
        <Row>
          <Col>
            <RecordView />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Icons;
