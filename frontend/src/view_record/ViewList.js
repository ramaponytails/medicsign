import React, { Component } from "react";
import axios from "axios";
import { getUser } from "app/App.js";

import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";

class RecordList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      records: [],
    };
    this.queryRecordList = this.queryRecordList.bind(this);
  }

  async queryRecordList() {
    try {
      const user = getUser();
      const query_path = `http://localhost:3000/doctor/list/` + tostr(user._id);
      const res = await axios.get(query_path);
      const { data } = res.data;
      this.setState({
        records: data.records,
      });
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  }

  componentDidMount() {
    if (isLoggedIn()) {
      this.queryRecordList();
    } else {
      console.error("Not Logged In");
    }
  }

  render() {
    return <div>Something</div>;
  }
}
