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
    const query_path = "http://localhost:3000/doctor/list/" + user._id;
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
  }

  async componentDidMount() {
    if (isLoggedIn()) {
      const res = await queryRecordList();
      console.log(res);
      this.state({
        records: res.records,
      });
    } else {
      console.error("Not Logged In");
    }
  }

  render() {
    return (
      <>
        <Container fluid>
          <Row>
            <Col md="12">
              <Card className="strpied-tabled-with-hover">
                <Card.Header>
                  <Card.Title as="h4">Striped Table with Hover</Card.Title>
                  <p className="card-category">
                    Here is a subtitle for this table
                  </p>
                </Card.Header>
                <Card.Body className="table-full-width table-responsive px-0">
                  <Table className="table-hover table-striped">
                    <thead>
                      <tr>
                        <th className="border-0">ID</th>
                        <th className="border-0">Patient Name</th>
                        <th className="border-0">Disease</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.records.map((val, key) => {
                        return (
                          <tr key={key}>
                            <td>{val.id}</td>
                            <td>{val.patient_name}</td>
                            <td>{val.disease}</td>
                            <td>
                              <a href={"/record/" + val.id}>More Details</a>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default RecordList;
