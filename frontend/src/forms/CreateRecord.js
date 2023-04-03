import React, { Component } from "react";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";

import { createRSA, getPublic, getPrivate, signRSA } from "app/App";
import { isLoggedIn } from "login/Accounts";

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

  if (!values.patientid) {
    errors.patientid = "Patient ID required";
  }

  if (!values.doctorid) {
    errors.doctorid = "Doctor ID required";
  }

  if (!values.disease) {
    errors.disease = "Disease required";
  }

  if (!values.diagnosis) {
    errors.diagnosis = "Diagnosis required";
  }

  return errors;
};

async function create(payload) {
  try {
    const res = await axios.post(`http://localhost:3000/record/create`, {
      record: payload,
    });
    console.log(`Success!`);
    console.log(res.data);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

async function handleSubmit(values, { setSubmitting }) {
  let current_time = new Date();

  const created_at = current_time.getTime();

  const signed_data = {
    patient_id: values.patientid,
    doctor_id: values.doctorid,
    disease: values.disease,
    diagnosis: values.diagnosis,
    created_at: created_at,
  };

  const JSON_signed = JSON.stringify(signed_data);
  console.log(JSON_signed);

  const signature = await signRSA(JSON_signed);

  const payload = {
    patient_id: values.patientid,
    doctor_id: values.doctorid,
    disease: values.disease,
    diagnosis: values.diagnosis,
    created_at: created_at,
    signature: signature,
  };

  console.log(payload);

  setTimeout(async () => {
    await create(payload);
    setSubmitting(false);
  }, 400);
}

const RecordForm = () => {
  return (
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
          <label htmlFor="patientid" className="col-sm-2">
            Patient ID
          </label>
          <div className="col-sm-10">
            <Field className="form-control" name="patientid" type="text" />
            <ErrorMessage name="patientid">
              {(msg) => <div style={{ color: "red" }}>{msg}</div>}
            </ErrorMessage>
          </div>
        </div>
        <div className="form-group row mb-2">
          <label htmlFor="doctorid" className="col-sm-2">
            Doctor ID
          </label>
          <div className="col-sm-10">
            <Field className="form-control" name="doctorid" type="text" />
            <ErrorMessage name="doctorid">
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
  );
};

export default RecordForm;
