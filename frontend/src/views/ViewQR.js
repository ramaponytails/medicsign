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
  const QRSize = 2 / 3 * Math.min(window.screen.height, window.screen.width);
  return (
    <>
      <Container className="centered" fluid>
        <Row>
          <Col className="ml-auto mr-auto">
            <QRCode className="centered" style={{
              display: 'flex',
              margin: 'auto',
            }} size={QRSize} value={getPatientID()} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default QRView;
