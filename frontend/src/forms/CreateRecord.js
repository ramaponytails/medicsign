import React, { Component } from "react";

import { Container, Row, Col, Button, Form } from "react-bootstrap";

class RecordForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            step: 1, // If we want to make it a multistep form
            doctor_name: "",
            patient_name: "",
            medical_condition: "",
            disease: "",
            hospital_entry: "",
            hospital_release: "",
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render(){
        return (
            <Form className="mb-3">
                <Form.Group as={Row} className="mb-3" controlId="formDoctorName">
                    <Form.Label column sm={2} className="label">Doctor Name</Form.Label>
                    <Col sm={10}>
                        <Form.Control type="text" name="doctor_name" 
                            value={this.state.doctor_name} onChange={this.handleChange} required>
                        </Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formPatientName">
                    <Form.Label column sm={2} className="label">Patient Name</Form.Label>
                    <Col sm={10}>
                        <Form.Control type="text" name="patient_name" 
                            value={this.state.patient_mame} onChange={this.handleChange} required>
                        </Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formDisease">
                    <Form.Label className="label">Disease</Form.Label>
                    <Form.Control type="text" name="disease" 
                        value={this.state.disease} onChange={this.handleChange} required>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formMedicalCondition">
                    <Form.Label className="label">Medical Condition</Form.Label>
                    <Form.Control as="textarea" rows={5} name="medical_condition" 
                        value={this.state.medical_condition} onChange={this.handleChange} required>
                    </Form.Control>
                </Form.Group>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formHospitalEntry">
                        <Form.Label className="label">Hospital Entry</Form.Label>
                        <Form.Control type="date" name="hospital_entry"
                            value={this.state.hospital_entry} onChange={this.handleChange} required>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formHospitalRelease">
                        <Form.Label className="label">Hospital Release</Form.Label>
                        <Form.Control type="date" name="hospital_release"
                            value={this.state.hospital_release} onChange={this.handleChange} required>
                        </Form.Control>
                    </Form.Group>
                </Row>
                <Button variant="primary" type="submit"> Submit </Button>
            </Form>
        )
    }
}

export default RecordForm;