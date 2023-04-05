import React from "react";
import QRCode from 'qrcode.react';
import { getUser, isLoggedIn } from "login/Accounts";

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

async function getPatientID() {
  try {
    const user = await getUser();
    const patientID = user.getPatientID;
    return patientID;
  }
  catch(error) {
    console.error(`Error: ${error}`);
  }
}

function QRView() {
  return (
    <>
      <Container>
        <Row>
          <Col>
            <QRCode value={getPatientID()} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default QRView;