import React, { Component } from "react";

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
} from "react-bootstrap";

class RecordView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctor_name: "TEST DOCTOR NAME",
      patient_name: "TEST PATIENT NAME",
      medical_condition: "TEST MEDICAL CONDITION",
      disease: "TEST DISEASE",
      hospital_entry: "TEST ENTRY",
      hospital_release: "TEST RELEASE",
      record_number: "2834084",
    };
  }
  render() {
    return (
      <Container fluid>
        <Row>
          <Col>
            <Card className="card-plain table-plain-bg">
              <Card.Header>
                <Card.Title as="h4">
                  Record {this.state.record_number}
                </Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover">
                  <tbody>
                    <tr>
                      <td width="15%">Doctor Name</td>
                      <td>{this.state.doctor_name}</td>
                    </tr>
                    <tr>
                      <td>Patient Name</td>
                      <td>{this.state.patient_name}</td>
                    </tr>
                    <tr>
                      <td>Medical Condition</td>
                      <td>{this.state.medical_condition}</td>
                    </tr>
                    <tr>
                      <td>Disease</td>
                      <td>{this.state.disease}</td>
                    </tr>
                    <tr>
                      <td>Hospital Entry Date</td>
                      <td>{this.state.hospital_entry}</td>
                    </tr>
                    <tr>
                      <td>Hospital Release Date</td>
                      <td>{this.state.hospital_release}</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default RecordView;
