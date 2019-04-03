import React from 'react';
import { Redirect} from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Input,
  Label,
  Row,
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
    if (localStorage.getItem('role') != 'admin') {
      return <Redirect to="/vacancies-applicant" />
    }

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
