import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button, Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';

const API = 'http://localhost:8000';

class Vacancies extends Component {
  constructor(props){
    super(props);

    this.state = {
      lowongan: []
    }
  }

  componentDidMount(){
    axios.get(API + '/po/all-lowongan')
    .then(res => {
      const lowongan = res.data;
      this.setState({lowongan})
    })
  }

  render() {
    var list_lowongan = this.state.lowongan;
    const list = list_lowongan.map((lowongan) =>
    <tr>
      <td> {lowongan.nama} </td>
      <td> {lowongan.divisi} </td>
      <td> {lowongan.start_date} </td>
      <td> {lowongan.end_date} </td>
      <td> {lowongan.publish_date} </td>
      <td> {lowongan.lokasi} </td>
      <td> {lowongan.tipe} </td>
    </tr>
    );
    return (
      <div className="animated fadeIn">
        <Row className="align-items-center">
          <Col col="3" sm="4" md="2" xl className="mb-3 mb-xl-0">

            <Link to="/addVacancy">

                <Button block color="primary">Add Vacancy</Button>
            </Link>
          </Col>
          <Col col="3" sm="4" md="2" xl className="mb-3 mb-xl-0">
          </Col>
          <Col col="3" sm="4" md="2" xl className="mb-3 mb-xl-0">
          </Col>
          <Col col="3" sm="4" md="2" xl className="mb-3 mb-xl-0">
          </Col>
          <Col col="3" sm="4" md="2" xl className="mb-3 mb-xl-0">
          </Col>
          <Col col="3" sm="4" md="2" xl className="mb-3 mb-xl-0">
          </Col>
        </Row>
        <br></br>
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Vacancy List
              </CardHeader>
              <CardBody>
                <Table hover bordered striped responsive size="sm">
                  <thead>
                  <tr>
                    <th>Nama</th>
                    <th>Divisi</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Publish Date</th>
                    <th>Lokasi</th>
                    <th>Tipe</th>
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

export default Vacancies;
