import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ChooseCurrentStage from '../Applicants';
import ChooseStages from '../Applicants';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem,
  Form, FormGroup, Label, Input, Button, PaginationLink, Row, Table, CardTitle,
  CardText, Progress, FormText } from 'reactstrap';

const API = 'http://localhost:8000';

class Reject extends Component {
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

    if (window.confirm('Are you sure you want to reject this applicant ?')){
      console.log(this.state);

      // axios post
      var qs = require('qs');

      //post it to backend
      axios.post('http://localhost:8000/po/update-tahapan-lamaran', qs.stringify({
        'id': this.state.lamaran.id,
        'tahapan': 'Rejected',
        'status': 'Rejected',
      }),
      {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })
      .then(function (response) {
          console.log(response.data);
      })

      this.setState({
        lamaran: {
          tahapan: 'Rejected',
          status: 'Rejected',
        }
      })
    }

  }

  render() {
    let content;

    if (this.state.loading){
      content = <div align="center"><p>Loading . . .</p></div>;
    } else {

      if (this.state.lamaran.tahapan === 'Rejected' && localStorage.getItem('role') === 'admin') {

        content = (
          <div>
            <CardTitle>
              The applicant above has been rejected from SIRCLO's recruitment process. <br/>
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
              The applicant above will be <strong>rejected</strong> from the recruitment process. A notification email will be sent to the applicant. <br/>
            </CardTitle>
            <br/>
            <Form method="post" onSubmit={this.handleSubmit}>
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
                  <Link to={"/applicants/" +  this.state.lamaran.id}> <Button className="btn-pill" outline color="danger" block>Cancel</Button> </Link>
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
          <h3>Reject</h3>
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

export default Reject;
