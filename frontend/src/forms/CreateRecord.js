import React, { Component } from "react";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";

import { isLoggedIn, createRSA, getPublic, getPrivate } from "app/App";
// name
// email
// password
// hospital

const validate = (values) => {
  const name_regex = /^\w+( \w+)*$/i;
  const email_regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
  const password_regex = /^[A-Za0-9._*%&$\\\/]/i;
  const hospital_regex = /^[a-zA-Z0-9_-]+( [a-zA-Z0-9_-]+)*$/i;

  const errors = {};

  if (!values.name) {
    errors.name = "Name required";
  } else if (!name_regex.test(values.name)) {
    errors.name = "Name must only contain alphabet characters and spaces";
  }

  return errors;
};

async function create(payload) {
  try {
    const res = await axios.post(
      `http://localhost:3000/record/create`,
      payload
    );
    console.log(`Success!`);
    console.log(res.data);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

async function handleSubmit(values, { setSubmitting }) {
  const payload = {
    patientid: values.patientid,
    doctorid: values.doctorid,
    disease: values.disease,
    diagnosis: values.diagnosis,
  };

  setTimeout(async () => {
    await create(payload);
    setSubmitting(false);
  }, 400);
}

const RecordForm = () => {
  return (
    <div className="container mt-5">
      <Formik
        validate={validate}
        onSubmit={handleSubmit}
        initialValues={{
          patientid: "",
          doctorid: "",
          disease: "",
          diagnosis: "",
        }}
      >
        <Form>
          <div className="form-group row mb-2">
            <label htmlFor="patient-id" className="col-sm-2">
              Patient ID
            </label>
            <div className="col-sm-10">
              <Field className="form-control" name="patient-id" type="text" />
              <ErrorMessage name="patient-id">
                {(msg) => <div style={{ color: "red" }}>{msg}</div>}
              </ErrorMessage>
            </div>
          </div>
          <div className="form-group row mb-2">
            <label htmlFor="doctor-id" className="col-sm-2">
              Doctor ID
            </label>
            <div className="col-sm-10">
              <Field className="form-control" name="doctor-id" type="text" />
              <ErrorMessage name="doctor-id">
                {(msg) => <div style={{ color: "red" }}>{msg}</div>}
              </ErrorMessage>
            </div>
          </div>
          <div className="form-group row mb-2">
            <label htmlFor="disease" className="col-sm-2">
              Disease
            </label>
            <div className="col-sm-10">
              <Field className="form-control" name="disease" type="text" />
              <ErrorMessage name="disease">
                {(msg) => <div style={{ color: "red" }}>{msg}</div>}
              </ErrorMessage>
            </div>
          </div>
          <div className="form-group row mb-2">
            <label htmlFor="diagnosis" className="col-sm-2">
              Diagnosis
            </label>
            <div className="col-sm-10">
              <Field
                component="textarea"
                style={{ width: "100%", height: "auto" }}
                rows="10"
                className="form-control"
                name="diagnosis"
                type="textarea"
              />
              <ErrorMessage name="diagnosis">
                {(msg) => <div style={{ color: "red" }}>{msg}</div>}
              </ErrorMessage>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default RecordForm;
