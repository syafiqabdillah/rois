import React, { Component } from 'react';
import axios from 'axios';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';

const API = 'http://localhost:8000';

class Assessments extends Component {
  constructor(props){
    super(props);

    this.state = {
      soal: []
    }
  }

  componentDidMount(){
    axios.get(API + '/po/all-soal')
    .then(res => {
      const soal = res.data;
      this.setState({soal})
    })
  }

  render() {
    var list_soal = this.state.soal;
    const list = list_soal.map((soal) =>
    <tr>
      <td> {soal.nama} </td>
      <td> {soal.lowongan} </td>
      <td> {soal.nama_karyawan} </td>
      <td> {soal.created_date} </td>
    </tr>
    );
    return (
      <div className="animated fadeIn">
        <div align="center">
          <h3>Assessments</h3>
        </div>
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Assessment List
              </CardHeader>
              <CardBody>
                <Table hover bordered striped responsive size="sm">
                  <thead>
                  <tr>
                    <th>Name</th>
                    <th>Vacancy</th>
                    <th>Creator</th>
                    <th>Created Date</th>
                  </tr>
                  </thead>
                  <tbody>
                    {list}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Assessments;
