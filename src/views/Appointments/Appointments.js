import React, { Component } from 'react';
import axios from 'axios';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';

const API = 'http://localhost:8000';

class Appointments extends Component {
  constructor(props){
    super(props);

    this.state = {
      appointment: []
    }
  }

  componentDidMount(){
    axios.get(API + '/po/all-appointment')
    .then(res => {
      const appointment = res.data;
      this.setState({appointment})
    })
  }

  render() {
    var list_appointment = this.state.appointment;
    const list = list_appointment.map((appointment) =>
    <tr>
      <td> {appointment.id_lamaran} </td>
      <td> {appointment.date} </td>
      <td> {appointment.start} </td>
      <td> {appointment.end} </td>
      <td> {appointment.lokasi} </td>
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
                    <th>Application ID (nanti ganti)</th>
                    <th>Date</th>
                    <th>Start</th>
                    <th>End</th>
                    <th>Lokasi</th>
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

export default Appointments;
