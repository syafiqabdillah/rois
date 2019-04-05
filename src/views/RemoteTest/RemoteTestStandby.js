import React, { Component } from 'react';
import axios from 'axios';
import ChooseCurrentStage from '../Applicants';
import ChooseStages from '../Applicants';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem,
  Form, FormGroup, Label, Input, Button, PaginationLink, Row, Table, CardTitle,
  CardText, Progress, FormText } from 'reactstrap';

const API = 'http://localhost:8000';

class RemoteTestStandby extends Component {
  constructor(props){
    super(props);

    this.state = {
      lamaran: [],
      loading: true
    }
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

  render() {
    let content;

    if (this.state.loading){
      content = <div align="center"><p>Loading . . .</p></div>;
    } else {

      content = (
        <div>
          <Row>
            <Col lg={8}>
            </Col>
            <Col lg={4}>
              <Link to={"/applicants/" + this.state.lamaran.id}> <p>go to applicant's profile</p> </Link>
            </Col>
          </Row>
        </div>
      );
    }

    return (
      <div className="animated fadeIn">
        <div align="center">
          <h3>Remote Test Standby</h3>
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
                <CardTitle>
                  The answers for the assessment remote test of the applicant above is not available yet. <br/> Please be patient and <strong>wait for further notification.</strong>
                </CardTitle>
                <CardText>
                  <br/>
                  {content}
                </CardText>
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

export default RemoteTestStandby;
