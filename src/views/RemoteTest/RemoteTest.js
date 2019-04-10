import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ChooseCurrentStage from '../Applicants';
import ChooseStages from '../Applicants';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem,
  Form, FormGroup, Label, Input, Button, PaginationLink, Row, Table, CardTitle,
  CardText, Progress, FormText } from 'reactstrap';

const API = 'http://localhost:8000';

class RemoteTest extends Component {

  constructor(props){
    super(props);

    this.state = {
      lamaran: [],
      soal: [],
      id_lamaran: 0,
      loading: true,
      duration: 0,
      tester_email: '',
      id_soal: 0,
      start_date: null,
      status: '',
      link_jawaban: '',
      expired_date: null,
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    axios.get(API + '/po/lamaran/' + this.props.match.params.id)
    .then(res => {
      const lamaran = res.data;
      console.log(lamaran);
      this.setState({
        lamaran: lamaran,
      })
    })

    axios.get(API + '/po/all-soal/')
    .then(res => {
      const soal = res.data;
      console.log(soal);
      this.setState({
        soal: soal,
        loading: false
      })
    })

  }

  handleInputChange = (e) => {
    e.preventDefault()
    this.setState({
      [e.target.name]: e.target.value
    })
    console.log(this.state.id_soal);
  }

  handleSubmit = (e) => {
    e.preventDefault()

    if (window.confirm('Are you sure you have entered correct data ?')){
      console.log(this.state);
      console.log("MASHOK PAK EKO");
      // axios post
      var qs = require('qs');

      //post it to backend
      axios.post(API + '/po/create-remote-test', qs.stringify({
        'id_lamaran': this.state.lamaran.id,
        'duration': this.state.duration,
        'tester_email': this.state.tester_email,
        'expired_date': this.state.expired_date,
        'id_soal': this.state.id_soal,
        'active' : 'yes',
      }),
      {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })
      .then(function (response) {
          console.log(response.data);
      })

      axios.post(API + '/po/update-tahapan-lamaran', qs.stringify({
        'id': this.state.lamaran.id,
        'tahapan': 'Remote Test',
        'status': 'Assigned',
      }),
      {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })
      .then(function (response) {
          console.log(response.data);
      })

      this.setState({
        lamaran: {
          tahapan: 'Remote Test',
          status: 'Assigned',
        }
      })

      // window.location.reload()

    }

  }

  render() {
    let content;

    if (this.state.loading){
      content = <div align="center"><p>Loading . . .</p></div>;
    } else {

      if (this.state.lamaran.tahapan === 'Remote Test' && this.state.lamaran.status === 'Assigned' && localStorage.getItem('role') === 'admin') {

        content = (
          <div>
            <CardTitle>
              The answers for the assessment remote test of the applicant above is not available yet. <br/> Please be patient and <strong>wait for further notification.</strong>
            </CardTitle>
            <br />
            <Row>
              <Col lg={8}>
              </Col>
              <Col lg={4}>
                <Link to={"/applicants/" + this.state.lamaran.id}> <p>go to applicant's profile</p> </Link>
              </Col>
            </Row>
          </div>
        );

      } else if (this.state.lamaran.tahapan === 'Remote Test' && this.state.lamaran.status === 'Answered' && localStorage.getItem('role') === 'admin') {

        content = (
          <div>
            <CardTitle>
              The answers for the assessment remote test of the applicant above can be accessed at this <Link to="https://github.com/syafiqabdillah/rois"> github link. </Link>
            </CardTitle>
            <br />
            <Row>
              <Col lg={8}>
              </Col>
              <Col lg={4}>
                <Link to={"/applicants/" + this.state.lamaran.id}> <p>go to applicant's profile</p> </Link>
              </Col>
            </Row>
          </div>
        );

      } else {

        let list_soal = this.state.soal.map((soal, index) => {
          return (
            <option key={index} value={soal.id}> {soal.nama} </option>
          );
        })

        content = (
          <div>
            <CardTitle>
              The applicant above will be given the assessments remote test below:
            </CardTitle>
            <br/>
            <Form method="post" onSubmit={this.handleSubmit}>
              <FormGroup row>
                <Label for="duration" sm={3}>Duration (Days)</Label>
                <Col sm={9}>
                  <Input
                    type="number"
                    name="duration"
                    id="duration"
                    onChange={this.handleInputChange}
                    required
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="id_soal" sm={3}>Assessment File</Label>
                <Col sm={9}>
                  <Input type="select" default="Pilih" name="id_soal" id="id_soal" onChange={this.handleInputChange} required>
                    {list_soal}
                  </Input>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="tester_email" sm={3}>Tester's Email</Label>
                <Col sm={9}>
                  <Input type="email" name="tester_email" id="tester_email" onChange={this.handleInputChange} required/>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="expired_date" sm={3}>Expire Date</Label>
                <Col sm={9}>
                  <Input
                    type="date"
                    name="expired_date"
                    id="expired_date"
                    onChange={this.handleInputChange}
                    required
                  />
                </Col>
              </FormGroup>
              <br/>
              <Row>
                <Col lg={6}>
                  <p><u>see preview email</u></p>
                </Col>
                <Col lg={3}>
                  <Link to={"/applicants/" +  this.state.lamaran.id}> <Button className="btn-pill" outline color="danger" block>Cancel</Button> </Link>
                </Col>
                <Col lg={3}>
                  <Button className="btn-pill" color="primary" type="submit" block>Confirm</Button>
                </Col>
              </Row>
            </Form>
          </div>
        );

      }
    }

    return (
      <div className="animated fadeIn">
        <div align="center">
          <h3>Remote Test</h3>
        </div>
        <br />
        <Row>
          <Col lg={3}>
          </Col>
          <Col lg={6}>
            <Card >
              <CardHeader>
                <i className="fa fa-user pr-1"></i>{this.state.lamaran.pelamar} <Badge color="secondary">Candidate {this.state.lamaran.lowongan}</Badge>
              </CardHeader>
              <CardBody>
                {content}
              </CardBody>
            </Card>
          </Col>
          <Col lg={3}>
          </Col>
        </Row>
      </div>
    );
  }
}

export default RemoteTest;
