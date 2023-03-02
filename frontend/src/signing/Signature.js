import React, { component } from "react";
import axios from "axios";

class Signature extends Component {
  constructor(props) {
    super(props);
  }

  signRecord() {
    console.log("sign");
  }

  render() {
    return (
      <div>
        <button onClick={signRecord}>Sign Document</button>
      </div>
    );
  }
}
