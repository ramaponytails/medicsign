import React, { component } from "react";
import axios from "axios";
import { signRSA } from "app/App.js";

class Signature extends Component {
  constructor(props) {
    super(props);
  }

  signRecord() {
    data = JSON.stringify(this.props.data);
    signature = signRSA(data);
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

export default Signature;
