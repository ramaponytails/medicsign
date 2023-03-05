import React, { Component } from "react";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { saveRSA } from "app/App";
import { isLoggedIn, saveUser } from "./Accounts";

const validate = (values) => {
  const email_regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
  const password_regex = /^[A-Za0-9._*%&$\\\/]/i;

  const errors = {};

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

  return errors;
};

async function loginUser(payload) {
  try {
    const res = await axios.post(
      "http://localhost:3000/patient/login",
      payload
    );
    const { data } = res.data;
    return data;
  } catch (error) {
    console.log(`Error: ${error}`);
    return "Not Found";
  }
}

const LoginPatient = () => {
  return (
    <div className="container mt-5">
      <Formik
        validate={validate}
        onSubmit={async (values, { setSubmitting }) => {
          if (isLoggedIn()) {
            console.error(`Login but logged in`);
            setSubmitting(false);
            return;
          }

          const payload = {
            credentials: {
              email: values.email,
              password: values.password,
            },
          };

          setTimeout(async () => {
            const data = await loginUser(payload);
            const token = data.token;
            const user = data.user;
            user.type = "Patient";

            if (token === "Not Found") {
              alert("User not found");
            } else {
              saveUser(user);
              saveRSA({
                publicKey: token.publicKey,
                privateKey: token.privateKey,
              });
            }
            setSubmitting(false);
          }, 400);
        }}
        initialValues={{
          email: "",
          password: "",
        }}
      >
        {({ isSubmitting }) => (
          <Form>
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
                <Field
                  className="form-control"
                  name="password"
                  type="password"
                />
                <ErrorMessage name="password">
                  {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                </ErrorMessage>
              </div>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginPatient;
