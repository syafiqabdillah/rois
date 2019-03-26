import React, { Component } from 'react';
import axios from 'axios';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import { MDBDataTable } from 'mdbreact';

const API = 'http://localhost:8000';

const data = {
  columns: [
    {
      label: "Candidate's Name",
      field: 'pelamar',
      sort: 'asc',
      width: 150
    },
    {
      label: 'Vacancy',
      field: 'lowongan',
      sort: 'asc',
      width: 270
    },
    {
      label: 'Salary Expectation',
      field: 'salary_exp',
      sort: 'asc',
      width: 200
    },
    {
      label: 'Current Stage',
      field: 'tahapan',
      sort: 'asc',
      width: 100
    },
    {
      label: 'Status',
      field: 'status',
      sort: 'asc',
      width: 150
    },
  ],
  rows: []
};

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

  handleRowClick(e){
    window.location = "/#/applicants/" + e.id;
  };

  render() {
    let content;

    if (this.state.loading) {
      content = <div align="center"><p>Loading . . .</p></div>;
    } else {
      let list_lamaran = this.state.lamaran.map((lamaran) => {
        return (
          {
            pelamar: lamaran.pelamar,
            lowongan: lamaran.lowongan,
            salary_exp: lamaran.salary_exp,
            tahapan: lamaran.tahapan,
            status: lamaran.status,
            clickEvent: () => this.handleRowClick(lamaran),
          }
        );
      });

      for (var i = 0; i < list_lamaran.length; i++) {
        data.rows.push(list_lamaran[i]);
      }

      content = (
        <MDBDataTable borderless striped hover small btn data={data} />
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

/*
return (
  <tr>
    <td> {lamaran.pelamar} </td>
    <td> {lamaran.lowongan} </td>
    <td> {lamaran.salary_exp} </td>
    <td> {lamaran.tahapan} </td>
    <td> {lamaran.status} </td>
  </tr>
);

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
*/
