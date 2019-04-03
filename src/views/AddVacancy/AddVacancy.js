import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Button, Card, CardBody,
  Form, FormGroup, Input, Label, Col, Row
} from 'reactstrap';

class AddVacancy extends Component {

  constructor(props) {

    super(props);

    this.state = {
      name: '',
      division: '',
      location: '',
      type: '',
      responsibilities: [],
      requirements: [],
      start_date: '',
      finish_date: '',
      publish_date: ''

    };

  }

  handleSubmit = (event) => {
    event.preventDefault()
    var qs = require('qs');
    axios.post('http://localhost:8000/po/create-lowongan', qs.stringify({
      'nama': this.state.name,
      'start_date': this.state.start_date,
      'end_date': this.state.finish_date,
      'publish_date': this.state.publish_date,
      'divisi': this.state.division,
      'lokasi': this.state.location,
      'tipe': this.state.type,
    }),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error.response)
      });

    window.location.href = '#/vacancies';
  }


  handleChange = (event) => {
    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  addResponsibility(){

    var list_responsibilities=this.state.responsibilities;  
    list_responsibilities.push('');
    this.setState({
    responsibiliities:list_responsibilities
    })
    }


  render() {
    return (
      <div className="animated fadeIn">
        <div align="center">
          <h3 fontFamily="Metropolis">Add Vacancy</h3>
        </div>
        <Card>
          <CardBody>

            <Form onSubmit={this.handleSubmit}>

              <FormGroup>

                <Label htmlFor="name">Name*</Label>
                <Input type="text" id="name" name="name" placeholder="Enter Name.." onChange={this.handleChange} required />

              </FormGroup>

              <FormGroup>
                <Label htmlFor="divisi">Division*</Label>
                <Input type="select" name="division" onChange={this.handleChange} id="division" required>
                  <option value="">Please select</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Sales">Sales</option>
                  <option value="Support">Support</option>
                  <option value="Commerce">Commerce</option>
                  <option value="Technology">Technology</option>
                  <option value="Finance and People Operation">Support</option>
                  <option value="Other">Other</option>
                </Input>

              </FormGroup>

              <FormGroup>

                <Label htmlFor="location">Location*</Label>
                <Input type="text" id="location" name="location" placeholder="Enter Location.." onChange={this.handleChange} required />

              </FormGroup>

              <FormGroup>

                <Label htmlFor="select">Type*</Label>
                <Input type="select" name="type" id="type" onChange={this.handleChange} required>
                  <option value="">Please select</option>
                  <option value="Internship">Internship</option>
                  <option value="Contract">Contract</option>
                  <option value="Permanent">Permanent</option>
                </Input>

              </FormGroup>

              <FormGroup>

                <Row>
                  <Col xs="4">
                    <FormGroup>
                      <Label htmlFor="start_date">Start Date</Label>
                      <Input type="date" name="start_date" id="start_date" onChange={this.handleChange} required>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col xs="4">
                    <FormGroup>
                      <Label htmlFor="finish_date">Finish Date</Label>
                      <Input type="date" name="finish_date" id="finish_date" onChange={this.handleChange} required>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col xs="4">
                    <FormGroup>
                      <Label htmlFor="publish_date">Published Date</Label>
                      <Input type="date" id="publish_date" name="publish_date" onChange={this.handleChange} required />
                    </FormGroup>
                  </Col>
                </Row>

              </FormGroup>


              <Button className="btn-pill" color="primary" type="submit">Submit</Button>
            </Form>

          </CardBody>
        </Card>
      </div>
    );
  }
}

export default AddVacancy;
