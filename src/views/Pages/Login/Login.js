import React, { Component } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import GoogleLogin from 'react-google-login';
import axios from 'axios';

class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  responseGoogle = (response) => {
    let profile = response.profileObj;
    localStorage.setItem('profile',JSON.stringify(profile));
    
    let token = profile.googleId;
    localStorage.setItem('token', token);
    sessionStorage.setItem('token', token)

    const url = 'http://localhost:8000/login';

    var qs = require('qs');

    axios.post(url, qs.stringify({'token': token}),{
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then(function (response) {
      localStorage.setItem('role', 'pelamar');
      if(response.data.data.length !== 0){
        // datanya pelamar sudah ada di DB, masuk 
        window.location.href = '#/vacancies-applicant'
      } else {
        //tidak ada, ke register
        window.location.href = '#/register';
      }
    })

  }

  /**
   * handle login admin atau PO
   */
  handleSubmit = (e) => {
    e.preventDefault()

    if (this.state.username === "admin" && this.state.password === "admin"){
      localStorage.setItem('role', 'admin');
      localStorage.setItem('token', 'tokensementara');
      window.location.href = '#/dashboard';
    }
    
    // var qs = require('qs');
    // const data = qs.stringify(this.state)

    // const config = {
    //   headers:{
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //   }
    // }

    // const url = 'http://localhost:8000/login-admin'

    // axios.post(url, data, config)
    // .then(function (response){
    //   console.log(response)
    // })
    // cek username sama password untuk karyawan 

  }

  handleInputChange = (e) => {
    e.preventDefault()
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <div className="app flex-row align-items-center animated fadeIn">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>

                    <Form onSubmit={ this.handleSubmit }>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>

                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Name" autoComplete="name" name="username" onChange={this.handleInputChange} required/>
                      </InputGroup>

                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-key"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" 
                        placeholder="Password" 
                        //pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
                        name="password"
                        title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" required
                        onChange={this.handleInputChange} />
                      </InputGroup>

                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4">Login</Button>
                        </Col>
                      </Row>

                    </Form>

                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign in</h2>
                      <p>Join our team!</p>

                      {/* <div align="center">
                        <Link to="/register">
                          <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>
                        </Link>
                      </div> */}

                      <br></br>
                      <div align="center">
                        <GoogleLogin
                          clientId="814213310620-0arq20th3kurnr37u7srv6hn3fiubj99.apps.googleusercontent.com"
                          buttonText="Sign in with Google"
                          onSuccess={this.responseGoogle}
                          onFailure={this.responseGoogle}
                        />
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
