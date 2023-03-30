import React, { Component } from "react";
import axios from "axios";
import { signRSA } from "app/App.js";

class Signature extends Component {
  constructor(props) {
    super(props);
    this.signRecord = this.signRecord.bind(this);
  }

  signRecord() {
    const data = JSON.stringify(this.props.data);

    const signature = signRSA(data);
    console.log(signature);
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
