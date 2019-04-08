import React, { Component } from 'react';
import { Label, FormGroup, Button, Card, CardBody, Col, Container, Form, Input, Row, Modal, ModalHeader, ModalBody } from 'reactstrap';
import axios from 'axios';

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      nik: '',
      placeOfBirth: '',
      dateOfBirth: '',
      address: '',
      phone: '',
      modal: false
    }
  }

  componentDidMount() {
    let profile = JSON.parse(localStorage.getItem('profile'));

    this.setState({
      name: profile.name
    })
  }

  handleSubmit = (e) => {
    const data = this.state;
    e.preventDefault()

    let profile = JSON.parse(localStorage.getItem('profile'));
    let token = profile.googleId;
    let email = profile.email;

    var qs = require('qs');
    axios.post('http://localhost:8000/register', qs.stringify({
      'token': token,
      'nama': this.state.name,
      'nik': this.state.nik,
      'tempat_lahir': this.state.placeOfBirth,
      'tanggal_lahir': this.state.dateOfBirth,
      'alamat': this.state.address,
      'email': email,
      'phone': this.state.phone,
    }),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
      .then(function (response) {
        //handle success, munculin data
        console.log(response);
        localStorage.setItem('token', token);
        window.location.href = '#/dashboard';
      })
  }

  toggle = (e) => {
    e.preventDefault()
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  handleInputChange = (e) => {
    e.preventDefault()
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    let profile = JSON.parse(localStorage.getItem('profile'));
    let candidate_name = profile.name;

    return (
      <div className="app flex-row align-items-center animated fadeIn">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form onSubmit={this.toggle}>
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>

                    <FormGroup>
                      <Label for="name">Full Name*</Label>
                      <Input required type="text" name="name" id="name" placeholder="Your Full Name" defaultValue={candidate_name} onChange={this.handleInputChange} />
                    </FormGroup>

                    <FormGroup>
                      <Label for="nik">NIK*</Label>
                      <Input required type="text" maxLength="16" name="nik" id="nik" placeholder="Your 16-digits NIK" onChange={this.handleInputChange} />
                    </FormGroup>

                    <Row form>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="placeOfBirth">Place of Birth*</Label>
                          <Input required type="text" name="placeOfBirth" id="placeOfBirth" placeholder="" onChange={this.handleInputChange} />
                        </FormGroup>
                      </Col>

                      <Col md={6}>
                        <FormGroup>
                          <Label for="dateOfBirth">Date of Birth*</Label>
                          <Input required type="date" name="dateOfBirth" id="dateOfBirth" placeholder="" onChange={this.handleInputChange} />
                        </FormGroup>
                      </Col>
                    </Row>

                    <FormGroup>
                      <Label for="address">Address*</Label>
                      <Input required type="text" name="address" id="address" placeholder="" onChange={this.handleInputChange} />
                    </FormGroup>

                    <FormGroup>
                      <Label for="phone">Phone*</Label>
                      <Input required type="text" name="phone" id="phone" placeholder="" onChange={this.handleInputChange} />
                    </FormGroup>

                    <div align="center">
                      <Button color="primary" className="px-4" >Create Account</Button>
                    </div>

                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>

        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Confirmation</ModalHeader>
          <ModalBody>
            <Row>
              <Col xs="6" sm="2"></Col>
              <Col xs="6" sm="8">
                <h4><strong>Are you sure you have entered correct data ?</strong></h4>
              </Col>
              <Col sm="2"></Col>
            </Row>
            <Row>
              <Col xs="6" sm="2"></Col>
              <Col xs="6" sm="8">
                <Button color="primary" size="lg" onClick={this.handleSubmit} className="btn-pill" block>Yes, I'm sure</Button>
              </Col>
              <Col sm="2"></Col>
            </Row>
            <br />
            <Row>
              <Col xs="6" sm="2"></Col>
              <Col xs="6" sm="8">
                <Button color="danger" size="lg" onClick={this.toggle} className="btn-pill" block>Cancel</Button>
              </Col>
              <Col sm="2"></Col>
            </Row>
            <br />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default Register;
