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
    const data = JSON.stringify(this.props.data);

    const signature = window.atob(this.props.data.signature);
    console.log(signature);

    const verified = await verifyRSA(signature, data);
    this.setState({
      verification: verified ? "Verified" : "Not Verified",
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
