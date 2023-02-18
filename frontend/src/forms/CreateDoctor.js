import React, { Component } from "react";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";

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
    errors.name = "Name must only contain alphanumeric characters and spaces";
  }

  if (!values.email) {
    errors.email = "Email required";
  } else if (!email_regex.test(values.email)) {
    errors.email = "Not a valid email";
  }

  if (!values.password) {
    errors.password = "Password required";
  } else if (values.password.length < 6 || values.password.length > 15) {
    errors.password = "Password should be between 6-15 characters";
  } else if (!password_regex.test(values.password)) {
    errors.password =
      "Password can only contain alphanumeric characters and symbols (. _ * % & $ \\ /)";
  }

  if (!values.hospital) {
    errors.hospital = "Hospital required";
  }
  else if(!hospital_regex.test(values.hospital)) {
    errors.hospital = "Hospital name can ony contain alphanumeric characters, spaces, and symbols (- _)";
  }

  return errors;
};

async function create(payload) {
  try {
    const res = await axios.post(
      `http://localhost:3000/patient/create`,
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
    email: values.email,
    name: values.name,
    password: values.password,
    hospital: values.hospital,
  };

  setTimeout(() => {
    create(payload);
    setSubmitting(false);
  }, 400);
}

const DoctorForm = () => {
  return (
    <Formik
      validate={validate}
      onSubmit={handleSubmit}
      initialValues={{
        name: "",
        email: "",
        password: "",
        hospital: "",
      }}
    >
      <Form>
        <div className="form-group row mb-2">
          <label htmlFor="name" className="col-sm-2">
            Doctor Name
          </label>
          <div className="col-sm-10">
            <Field className="form-control" name="name" type="text" />
            <ErrorMessage name="name">
              {(msg) => <div style={{ color: "red" }}>{msg}</div>}
            </ErrorMessage>
          </div>
        </div>
        <div className="form-group row mb-2">
          <label htmlFor="email" className="col-sm-2">
            Email
          </label>
          <div className="col-sm-10">
            <Field className="form-control" name="email" type="email" />
            <ErrorMessage name="email">
              {(msg) => <div style={{ color: "red" }}>{msg}</div>}
            </ErrorMessage>
          </div>
        </div>
        <div className="form-group row mb-2">
          <label htmlFor="password" className="col-sm-2">
            Password
          </label>
          <div className="col-sm-10">
            <Field className="form-control" name="password" type="password" />
            <ErrorMessage name="password">
              {(msg) => <div style={{ color: "red" }}>{msg}</div>}
            </ErrorMessage>
          </div>
        </div>
        <div className="form-group row mb-2">
          <label htmlFor="hospital" className="col-sm-2">
            Hospital Name
          </label>
          <div className="col-sm-10">
            <Field className="form-control" name="hospital" type="hospital" />
            <ErrorMessage name="hospital">
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

export default DoctorForm;