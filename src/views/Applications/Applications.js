import React, { Component } from 'react';
import axios from 'axios';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';

const API = 'http://localhost:8000';

class Applications extends Component {
  constructor(props){
    super(props);

    this.state = {
      lamaran: [],
      loading: true
    }
  }

  componentDidMount(){
    axios.get(API + '/po/all-lamaran')
    .then(res => {
      const lamaran = res.data;
      this.setState({
        lamaran: lamaran,
        loading: false
      })
    })
  }

  render() {
    let content;

    if (this.state.loading){
      content = <div align="center"><p>Loading . . .</p></div>;
    } else {
      let list_lamaran = this.state.lamaran.map((lamaran) => {
        return (
          <tr>
            <td> {lamaran.pelamar} </td>
            <td> {lamaran.lowongan} </td>
            <td> {lamaran.salary_exp} </td>
            <td> {lamaran.tahapan} </td>
            <td> {lamaran.status} </td>
          </tr>
        );
      });

      content = (
        <Table hover bordered striped responsive size="sm">
          <thead>
          <tr>
            <th>Candidate's Name</th>
            <th>Vacancy</th>
            <th>Salary Expectation</th>
            <th>Current Stage</th>
            <th>Status</th>
          </tr>
          </thead>
          <tbody>
            {list_lamaran}
          </tbody>
        </Table>
      );
    }

    return (
      <div className="animated fadeIn">
        <div align="center">
          <h3>Applications</h3>
        </div>
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Application List
              </CardHeader>
              <CardBody>
                {content}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Applications;
