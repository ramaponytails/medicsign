import React, { Component } from "react";
import axios from "axios";
import { isLoggedIn } from "login/Accounts";

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

async function queryRecord(_id) {
  try {
    const res = await axios.get(
      "http://localhost:3000/record/view/" + toString(_id)
    );
    console.log("success");
    const { record } = res.data.data;
    return record;
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

async function queryDoctor(_id) {
  try {
    const res = await axios.get(
      "http://localhost:3000/doctor/view/" + toString(_id)
    );
    console.log("success");
    const { user } = res.data.data;
    return user;
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

async function queryPatient(_id) {
  try {
    const res = await axios.get(
      "http://localhost:3000/patient/view/" + toString(_id)
    );
    console.log("success");
    const { user } = res.data.data;
    return user;
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

class RecordView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctor_name: "",
      patient_name: "",
      disease: "",
      diagnosis: "",
      created_at: "",
      signature: "",
    };
  }

  async componentDidMount() {
    if (isLoggedIn()) {
      const { record_id } = useParams();
      const record = await queryRecord(record_id);
      const doctor = await queryDoctor(record.doctor_id);
      const patient = await queryPatient(record.patient_id);
      this.setState({
        doctor_name: doctor.name,
        patient_name: patient.name,
        disease: record.disease,
        diagnosis: record.diagnosis,
        created_at: record.created_at,
        signature: record.signature,
      });
    } else {
      console.error(`Not logged in`);
    }
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
                      <td>Disease</td>
                      <td>{this.state.disease}</td>
                    </tr>
                    <tr>
                      <td>Diagnosis</td>
                      <td>{this.state.diagnosis}</td>
                    </tr>
                    <tr>
                      <td>Signature</td>
                      <td>{this.state.signature}</td>
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
