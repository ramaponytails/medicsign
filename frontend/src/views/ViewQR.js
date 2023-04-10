import React from "react";
import QRCode from "qrcode.react";
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

function getPatientID() {
  const user = getUser();
  const patientID = user._id;
  return patientID;
}

function QRView() {
  const patient_id = getPatientID();
  console.log(patient_id);
  return (
    <>
      <Container>
        <Row>
          <Col>
            <QRCode value={patient_id} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default QRView;
