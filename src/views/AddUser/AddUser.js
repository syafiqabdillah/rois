import React, { Component } from 'react';
import axios from 'axios';
import { Button, Card, CardBody, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
//import 'antd/dist/antd.css';
import { message } from 'antd';

class AddUser extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      username: '',
      password: '',
      divisi: '',
      role:''
    }
  }

  handleSubmit = (e) => {
    const data = this.state;
    e.preventDefault();
    console.log(data);

    var qs = require('qs');

    //post to backend
    axios.post('http://localhost:8000/sysadmin/create-user', qs.stringify({
      'name': this.state.name,
      'username': this.state.username,
      'password': this.state.password,
      'role': this.state.role,
      'divisi': this.state.divisi,
    }),
    {
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
    message.info('Message', 5.5)
    message.loading('Saving...', 3)
    //.then(() => message.success(this.state.name + ' has successfully saved', 2.5))
    .then(() => window.location.href = '#/users')
    .then(() => window.location.reload())
  }

  handleInputChange = (e) => {
    e.preventDefault()
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  render() {

    return (
      <div className="animated fadeIn">
        <div align="center">
          <h3 fontFamily="Metropolis">Add User</h3>
        </div>
        <Card>
          <CardBody>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label for="name">Name*</Label>
                <Input type="text" name="name" id="name" onChange={this.handleInputChange} required/>
              </FormGroup>
              <FormGroup>
                <Label for="name">Username*</Label>
                <Input type="text" name="username" id="username" onChange={this.handleInputChange} required/>
              </FormGroup>
              <FormGroup>
                <Label for="name">Password*</Label>
                <Input type="password" name="password" id="password" onChange={this.handleInputChange} required/>
              </FormGroup>
              <FormGroup>
                <Label for="name">Role*</Label>
                <Input type="select" name="role" id="role" value={this.state.role} onChange={this.handleInputChange} required>
                  <option>ADMIN</option>
                  <option>SYSTEM ADMIN</option>
                  <option>KARYAWAN ONBOARDING</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="name">Divisi*</Label>
                <Input type="select" name="divisi" id="divisi" value={this.state.divisi} onChange={this.handleInputChange} required>
                  <option>Managerial</option>
                  <option>Technology</option>
                  <option>Sales</option>
                  <option>Marketing</option>
                  <option>Support</option>
                  <option>Commerce</option>
                  <option>Finance and People Operations</option>
                  <option>Other</option>
                </Input>
              </FormGroup>
              <Row>
                <Col xs="4">
                </Col>
                <Col xs="4">
                </Col>
                <Col xs="4">
                  <Button block color="primary" className="btn-pill" type="submit">Submit</Button>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default AddUser;
