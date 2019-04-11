import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ChooseCurrentStage from '../Applicants';
import ChooseStages from '../Applicants';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem,
  Form, FormGroup, Label, Input, Button, PaginationLink, Row, Table, CardTitle,
  CardText, Progress, FormText } from 'reactstrap';

const API = 'http://localhost:8000';

class Hire extends Component {
  constructor(props){
    super(props);

    this.state = {
      lamaran: [],
      loading: true
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    axios.get(API + '/po/lamaran/' + this.props.match.params.id)
    .then(res => {
      const lamaran = res.data;
      console.log(lamaran);
      this.setState({
        lamaran: lamaran,
        loading: false
      })
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    if (window.confirm('Are you sure you want to hire this applicant ?')){
      console.log(this.state);

      // axios post
      var qs = require('qs');

      //post it to backend
      axios.post('http://localhost:8000/po/update-tahapan-lamaran', qs.stringify({
        'id': this.state.lamaran.id,
        'tahapan': 'Hired',
        'status': 'Hired',
      }),
      {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })
      .then(function (response) {
          console.log(response.data);
      })

      this.setState({
        lamaran: {
          tahapan: 'Hired',
          status: 'Hired',
        }
      })

    }

  }

  render() {
    let content;

    if (this.state.loading){
      content = <div align="center"><p>Loading . . .</p></div>;
    } else {

      if (this.state.lamaran.tahapan === 'Hired' && localStorage.getItem('role') === 'admin') {

        content = (
          <div>
            <CardTitle>
              The applicant above has been successfully recruited as a SIRCLO's staff. <br/>
            </CardTitle>
            <br/>
            <Row>
              <Col lg={8}>
              </Col>
              <Col lg={4}>
                <Link to={"/applications"}> <p>back to applications list</p> </Link>
              </Col>
            </Row>
          </div>
        );

      } else {

        content = (
          <div>
            <CardTitle>
              The applicant above will be <strong>hired</strong> from the recruitment process. A notification email will be sent to the applicant.
            </CardTitle>
            <br/>
            <Form method="post" onSubmit={this.handleSubmit}>
              <FormGroup row>
                <Label for="offeringLetter" sm={3}>Offering Letter</Label>
                <Col sm={9}>
                  <Input type="file" name="file" id="offeringLetter" />
                  <FormText color="muted">
                    File size must not exceed 2MB.
                  </FormText>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="additionalMessage" sm={3}>Additional Message</Label>
                <Col sm={9}>
                  <Input type="textarea" name="text" id="additionalMessage" />
                </Col>
              </FormGroup>
              <br/>
              <Row>
                <Col lg={6}>
                  <p><u>see preview email</u></p>
                </Col>
                <Col lg={3}>
                  <Link to={"/applicants/" + this.state.lamaran.id}> <Button className="btn-pill" outline color="danger" block>Cancel</Button> </Link>
                </Col>
                <Col lg={3}>
                  <Button className="btn-pill" color="primary" block>Confirm</Button>
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
          <h3>Hire</h3>
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

export default Hire;
