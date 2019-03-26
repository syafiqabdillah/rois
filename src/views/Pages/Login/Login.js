import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
    console.log(profile);
    window.localStorage.setItem('profile',JSON.stringify(profile));
    //cek apakah token sudah ada, kalo udah ada, tolak, kalo ga, daftar
    
    let token = profile.googleId;
    //let token = "12345qwerty";

    const url = 'http://localhost:8000/login';

    var qs = require('qs');

    axios.post(url, qs.stringify({ 'token': token}),{
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then(function (response) {
      console.log(response.data);
      let role = response.data.role;
      let token = response.data.token;

      if(role == 'PELAMAR'){
        //ada datanya, ke dashboard
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        window.location.href = '#/dashboard';
      } else {
        //tidak ada, ke register
        window.location.href = '#/register';
      }
    })

  }

  handleSubmit = (e) => {
    const data = this.state
    e.preventDefault()
    console.log(data)
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
            <Col md="4">
              <CardGroup>
                {/* <Card className="p-4">
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
                        <Input type="text" placeholder="Name" autoComplete="name" name="username" onChange={this.handleInputChange}/>
                      </InputGroup>


                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4">Login</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Col>
                      </Row>

                    </Form>

                  </CardBody>
                </Card> */}
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
