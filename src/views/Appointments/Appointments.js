import React, { Component } from 'react';
import axios from 'axios';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';

const API = 'http://localhost:8000';

class Appointments extends Component {
  constructor(props){
    super(props);

    this.state = {
      appointment: [],
      loading: true
    }
  }

  componentDidMount(){
    axios.get(API + '/po/all-appointment')
    .then(res => {
      const appointment = res.data;
      this.setState({
        appointment: appointment,
        loading: false
      })
    })
  }

  render() {
    let content;

    if (this.state.loading){
      content = <div align="center"><p>Loading . . .</p></div>;
    } else {
      let list_appointment = this.state.appointment.map((appointment, index) => {
        return (
          <tr key={index}>
            <td> {appointment.pelamar} </td>
            <td> {appointment.phone} </td>
            <td> {appointment.email} </td>
            <td> {appointment.date} </td>
            <td> {appointment.start} </td>
            <td> {appointment.end} </td>
            <td> {appointment.lokasi} </td>
          </tr>
        );
      });

      content = (
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
            {list_appointment}
          </tbody>
        </Table>
      );
    }

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
                {content}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Appointments;
