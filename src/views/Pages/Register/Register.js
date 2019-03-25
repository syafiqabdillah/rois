import React, { Component } from 'react';
import { Label, FormGroup, Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import axios from 'axios';

class Register extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: '',
      nik: '',
      placeOfBirth: '',
      dateOfBirth: '',
      address: '',
      phone: '',
    }
  }

  componentDidMount(){
    let profile = JSON.parse(localStorage.getItem('profile'));

    this.setState({
      name: profile.name
    })
  }

  handleSubmit = (e) => {
    const data = this.state;
    e.preventDefault()
    console.log(data)

    let profile = JSON.parse(localStorage.getItem('profile'));

    let token = profile.googleId;
    let email = profile.email;

    //post it to backend
    axios.post('http://localhost:8000/register',{
      token: token,
      nama: this.state.name,
      nik: this.state.nik,
      tempat_lahir: this.state.placeOfBirth,
      tanggal_lahir: this.state.dateOfBirth,
      alamat: this.state.address,
      email: email,
      phone: this.state.phone,
    },
    {
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
    .then(function (response) {
        //handle success, munculin data
        console.log(response);
    })

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
                  <Form onSubmit={this.handleSubmit}>
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>

                    <FormGroup>
                      <Label for="name">Full Name*</Label>
                      <Input type="text" name="name" id="name" placeholder="Your Full Name" defaultValue={candidate_name} onChange={this.handleInputChange}/>
                    </FormGroup>

                    <FormGroup>
                      <Label for="nik">NIK*</Label>
                      <Input type="text" name="nik" id="nik" placeholder="Your 16-digits NIK" onChange={this.handleInputChange}/>
                    </FormGroup>

                    <Row form>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="placeOfBirth">Place of Birth*</Label>
                          <Input type="text" name="placeOfBirth" id="placeOfBirth" placeholder="" onChange={this.handleInputChange}/>
                        </FormGroup>
                      </Col>

                      <Col md={6}>
                        <FormGroup>
                          <Label for="dateOfBirth">Date of Birth*</Label>
                          <Input type="date" name="dateOfBirth" id="dateOfBirth" placeholder="" onChange={this.handleInputChange}/>
                        </FormGroup>
                      </Col>
                    </Row>

                    <FormGroup>
                      <Label for="address">Address*</Label>
                      <Input type="text" name="address" id="address" placeholder="" onChange={this.handleInputChange}/>
                    </FormGroup>

                    <FormGroup>
                      <Label for="phone">Phone*</Label>
                      <Input type="text" name="phone" id="phone" placeholder="" onChange={this.handleInputChange}/>
                    </FormGroup>

                    <div align="center">
                      <Button color="primary" className="px-4">Create Account</Button>
                    </div>

                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Register;
