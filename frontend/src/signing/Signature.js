import React, { Component } from "react";
import axios from "axios";
import { signRSA } from "app/App.js";

class Signature extends Component {
  constructor(props) {
    super(props);
    this.signRecord = this.signRecord.bind(this);
  }

  async signRecord() {
    const data = JSON.stringify(this.props.data);

    const signature = window.btoa(await signRSA(data));
    console.log(signature);

    let updated_record = this.props.data;
    updated_record.signature = signature;

    try {
      const res = await axios.get(
        "http://localhost:3000/record/update",
        updated_record
      );
      console.log(`Success!`);
      console.log(res.data);
    } catch (error) {
      console.error(`Error: ${error}`);
    }
    // update stuff
  }

  render() {
    return (
      <div>
        <button className="btn btn-primary" onClick={this.signRecord}>
          Sign Document
        </button>
      </div>
    );
  }
}

export default Signature;
