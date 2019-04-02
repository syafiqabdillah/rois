import React, { Component } from 'react';
import {
  Badge,
  ButtonDropdown,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Fade,
  Label,
  Row,
} from 'reactstrap';

import 'antd/dist/antd.css';
import  AppointmentForm from './AppointmentForm';
import moment from 'moment';


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
