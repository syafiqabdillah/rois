import React, { Component } from 'react';
import {
  Badge,
  Button,
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
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Row,
} from 'reactstrap';

import axios from 'axios';

class AddAppointment extends React.Component{
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      idLamaran: '1',
      date : '',
      start : '',
      end : '',
      location : '',
    };
  }

  handleSubmit = (event) => {
    event.preventDefault()
    var qs = require('qs');
    axios.post('http://localhost:8000/po/create-appointment', qs.stringify({
      'id_lamaran': this.state.idLamaran,
      'date': this.state.date,
      'start': this.state.start,
      'end': this.state.end,
      'lokasi' : this.state.location
    }),
    {
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
    window.location.href = '/#/appointmens';
  }

  handleChange = (event) => {
    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState }});
  }

  render() {
    return (
      <div className="animated fadeIn">
          <Col xs="10" sm="10">
            <Card>
              <CardHeader>
                  <strong>Add Appointment</strong>
              </CardHeader>
              <CardBody>
              <form onSubmit={this.handleSubmit}>
                <Row>
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="date"><strong>Date</strong></Label>
                      <Input type="date" name="date" id="date" onChange={this.handleChange}>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col xs="3">
                    <FormGroup>
                      <Label htmlFor="start"><strong>Start Time</strong></Label>
                      <Input type="time" name="start" id="start" onChange={this.handleChange}>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col xs="3">
                    <FormGroup>
                      <Label htmlFor="finish"><strong>Finish Time</strong></Label>
                      <Input type="time" name="end" id="end" onChange={this.handleChange}/>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="location"><strong>Location</strong></Label>
                      <Input type="text" id="location" name="location" placeholder="Enter Location" onChange={this.handleChange}/>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="selectInterviewer"><strong>Interviewer</strong></Label>
                      <Input type="select" name="interviewer" id="interviewer">
                        <option value="0">-- Please select --</option>
                        <option value="1">John Doe</option>
                        <option value="2">Andrew NG</option>
                        <option value="3">Steve Job</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="4">
                  </Col>
                  <Col xs="4">
                  </Col>
                  <Col xs="4">
                    <Button block color="primary" className="btn-pill" type="submit">Submit</Button>
                  </Col>
                </Row>
                </form>
              </CardBody>
            </Card>
          </Col>
        </div>
      );
    }
}

export default AddAppointment;
