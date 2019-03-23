import React, { Component } from 'react';
import axios from 'axios';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';

const API = 'http://localhost:8000';

class Assessments extends Component {
  constructor(props){
    super(props);

    this.state = {
      soal: [],
      loading: true
    }
  }

  componentDidMount(){
    axios.get(API + '/po/all-soal')
    .then(res => {
      const soal = res.data;
      this.setState({
        soal: soal,
        loading: false
      })
    })
  }

  render() {
    let content;

    if (this.state.loading){
      content = <div align="center"><p>Loading . . .</p></div>;
    } else {
      let list_soal = this.state.soal.map((soal) => {
        return (
          <tr>
            <td> {soal.nama} </td>
            <td> {soal.lowongan} </td>
            <td> {soal.nama_karyawan} </td>
            <td> {soal.created_date} </td>
          </tr>
        )
      });

      content = (
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
            { list_soal }
          </tbody>
        </Table>
      );
    }

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
                {content}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Assessments;
