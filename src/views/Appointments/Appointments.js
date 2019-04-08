import React, { Component } from 'react';
import axios from 'axios';
import { Card, CardBody, CardHeader, Col, Row} from 'reactstrap';
import { MDBDataTable } from 'mdbreact';

const API = 'http://localhost:8000';

const data = {
  columns: [
    {
      label: "Candidate's Name",
      field: 'candidate',
      sort: 'asc',
      width: 150
    },
    {
      label: 'Phone',
      field: 'phone',
      sort: 'asc',
      width: 150
    },
    {
      label: 'Email',
      field: 'email',
      sort: 'asc',
      width: 150
    },
    {
      label: 'Date',
      field: 'date',
      sort: 'asc',
      width: 100
    },
    {
      label: 'Start time',
      field: 'start_time',
      sort: 'asc',
      width: 100
    },
    {
      label: 'Finish_time',
      field: 'finish_time',
      sort: 'asc',
      width: 100
    },
    {
      label: 'Location',
      field: 'location',
      sort: 'asc',
      width: 150
    },
    {
      label: 'Interviewer',
      field: 'interviewer',
      sort: 'asc',
      width: 150
    },
  ],
  rows: []
};

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
          {
          candidate : appointment.pelamar,
          phone : appointment.phone,
          email : appointment.email,
          date : appointment.date,
          start_time : appointment.start,
          finish_time : appointment.end,
          location : appointment.lokasi,
          interviewer : appointment.interviewer
          }
        );
      });

      for (var i = 0; i < list_appointment.length; i++) {
        data.rows.push(list_appointment[i]);
      }

      content = (
        <MDBDataTable borderless striped hover small btn data={data} />
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
