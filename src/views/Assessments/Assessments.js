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
      <td> {soal.id_lowongan} </td>
      <td> {soal.nama_karyawan} </td>
      <td> {soal.created_date} </td>
    </tr>
    );
    return (
      <div className="animated fadeIn">
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
                    <th>Vacancy ID (nanti diganti)</th>
                    <th>Creator</th>
                    <th>Crated Date</th>
                  </tr>
                  </thead>
                  <tbody>
                    {list}
                  </tbody>
                </Table>
                <nav>
                  <Pagination>
                    <PaginationItem><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
                    <PaginationItem active>
                      <PaginationLink tag="button">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem><PaginationLink tag="button">2</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>
                  </Pagination>
                </nav>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Assessments;
