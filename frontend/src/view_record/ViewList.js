import React, { Component } from "react";
import axios from "axios";
import { getUser, isLoggedIn } from "login/Accounts";

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

async function queryRecordList() {
  try {
    const user = await getUser();
    const query_path = `http://localhost:3000/doctor/list/` + tostr(user._id);
    const res = await axios.get(query_path);
    const { data } = res.data;
    return data;
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

class RecordList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      records: [],
    };
    this.queryRecordList = this.queryRecordList.bind(this);
  }

  async componentDidMount() {
    if (isLoggedIn()) {
      const res = await queryRecordList();
      this.state({
        records: res.records,
      });
    } else {
      console.error("Not Logged In");
    }
  }

  render() {
    return <div>Something</div>;
  }
}
