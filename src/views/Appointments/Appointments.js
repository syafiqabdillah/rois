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
      <td> {appointment.pelamar} </td>
      <td> {appointment.phone} </td>
      <td> {appointment.email} </td>
      <td> {appointment.date} </td>
      <td> {appointment.start} </td>
      <td> {appointment.end} </td>
      <td> {appointment.lokasi} </td>
    </tr>
    );
    return (
      <div className="animated fadeIn">
        <div align="center">
          <h3>Appointments</h3>
        </div>
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Appointment List
              </CardHeader>
              <CardBody>
                <Table hover bordered striped responsive size="sm">
                  <thead>
                  <tr>
                    <th>Candidate's Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Date</th>
                    <th>Start</th>
                    <th>End</th>
                    <th>Location</th>
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

export default Appointments;
