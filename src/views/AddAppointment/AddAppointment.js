import React, { Component } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
} from 'reactstrap';

import 'antd/dist/antd.css';
import { Form } from 'antd';
import  AppointmentForm from './AppointmentForm';


class AddAppointment extends React.Component{
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
    };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState }});
  }

  render() {
    const FormAppointment = Form.create({ name: 'appointment' })(AppointmentForm);
    return (
      <div className="animated fadeIn">
          <Col xs="10" sm="10">
            <Card>
              <CardHeader>
                  <strong>Add Appointment</strong>
              </CardHeader>
              <CardBody>
                <FormAppointment />
              </CardBody>
            </Card>
          </Col>
        </div>
      );
    }
}
export default AddAppointment;
