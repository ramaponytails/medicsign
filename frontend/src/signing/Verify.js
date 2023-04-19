import React, { Component } from "react";
import axios from "axios";
import { verifyRSA } from "app/App.js";

class Verify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verification: "",
    };
    this.verifyRecord = this.verifyRecord.bind(this);
  }

  async verifyRecord() {
    const data = JSON.stringify(this.props.sign_data);
    console.log(data);

    const signature = this.props.signature;
    console.log(signature);

    const doctor_id = this.props.doctor_id;

    const verified = await verifyRSA(signature, data, doctor_id);
    this.setState({
      verification: verified
        ? "Signature verification successful"
        : "Signature verification fail",
    });
  }

  render() {
    return (
      <>
        <div>
          <button className="btn btn-primary" onClick={this.verifyRecord}>
            Verify Document
          </button>
        </div>
        <div>{this.state.verification}</div>
      </>
    );
  }
}

export default Verify;
