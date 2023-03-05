import React, { component } from "react";
import axios from "axios";
import { SignRSA } from "app/App.js";

class Signature extends Component {
  constructor(props) {
    super(props);
  }

  signRecord() {
    data = JSON.stringify(this.props.data);
    signature = SignRSA(data);
    // update stuff
  }

  render() {
    return (
      <div>
        <button onClick={signRecord}>Sign Document</button>
      </div>
    );
  }
}
