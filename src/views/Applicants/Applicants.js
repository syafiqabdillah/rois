import React, { Component } from 'react';
import axios from 'axios';
import ChooseCurrentStage from './ChooseCurrentStage';
import ChooseStages from './ChooseStages';
import HireNotification from '../FinalStage/HireNotification';
import RejectNotification from '../FinalStage/RejectNotification';
import Widget02 from '../Widgets/Widget02';
import Widget04 from '../Widgets/Widget04';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table, CardTitle, CardText, Progress, Tooltip } from 'reactstrap';

const API = 'http://localhost:8000';

class Applicants extends Component {
  constructor(props){
    super(props);

    this.state = {
      lamaran: [],
      loading: true,
      toolTipPhase: false,
      toolTipStatus: false,
    }

    this.togglePhase = this.togglePhase.bind(this);
    this.toggleStatus = this.toggleStatus.bind(this);
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

  togglePhase() {
    this.setState({
      toolTipPhase: !this.state.toolTipPhase
    });
  }

  toggleStatus() {
    this.setState({
      toolTipStatus: !this.state.toolTipStatus
    });
  }

  render() {
    let content;
    let stage;

    if (this.state.loading){
      content = <div align="center"><p>Loading . . .</p></div>;
    } else {

      content = (
        <Table borderless hover size="sm">
          <tbody>
            <tr>
              <th scope="row">Name</th>
              <td>: {this.state.lamaran.pelamar}</td>
            </tr>
            <tr>
              <th scope="row">Place, Date of Birth</th>
              <td>: {this.state.lamaran.detail_pelamar.tempat_lahir}, {this.state.lamaran.detail_pelamar.tanggal_lahir}</td>
            </tr>
            <tr>
              <th scope="row">NIK</th>
              <td>: {this.state.lamaran.detail_pelamar.nik}</td>
            </tr>
            <tr>
              <th scope="row">Address</th>
              <td>: {this.state.lamaran.detail_pelamar.alamat}</td>
            </tr>
            <tr>
              <th scope="row">Email</th>
              <td>: {this.state.lamaran.detail_pelamar.email}</td>
            </tr>
            <tr>
              <th scope="row">Handphone</th>
              <td>: {this.state.lamaran.detail_pelamar.phone}</td>
            </tr>
            <tr>
              <th scope="row">Experiences</th>
              <td>: {this.state.lamaran.experience.deskripsi}</td>
            </tr>
            <tr>
              <th scope="row">Skills</th>
              <td>: {this.state.lamaran.skill.deskripsi}</td>
            </tr>
            <tr>
              <th scope="row">Expected Salary</th>
              <td>: {this.state.lamaran.salary_exp}</td>
            </tr>
            <tr>
              <th scope="row">Resume</th>
              <td>: -</td>
            </tr>
            <tr>
              <th scope="row">About Me</th>
              <td>: {this.state.lamaran.cover_letter}</td>
            </tr>
          </tbody>
        </Table>
      );

      if (this.state.lamaran.status === 'Passed') {
        stage = (
          <ChooseStages lamaran={this.state.lamaran} />
        );
      } else if (this.state.lamaran.tahapan === 'Remote Test' &&  this.state.lamaran.status === 'Assigned') {
        stage = (
          <div>
            <ChooseCurrentStage lamaran={this.state.lamaran} />
            <Widget02 header="Assigned" mainText="Waiting for applicant's answer" icon="fa fa-hourglass" color="warning" />
          </div>
        );
      } else if (this.state.lamaran.tahapan === 'Remote Test' &&  this.state.lamaran.status === 'Answered') {
        stage  = (
          <div>
            <ChooseCurrentStage lamaran={this.state.lamaran} />
            <Widget02 header="Answered" mainText="Click here to see the applicant's answer" icon="fa fa-check" color="info" />
          </div>
        );
      } else if (this.state.lamaran.tahapan === 'Interview') {
        stage = (
          <div>
            <ChooseCurrentStage lamaran={this.state.lamaran} />
          </div>
        );
      } else if (this.state.lamaran.tahapan === 'Hired') {
        stage = (
          <Widget04 icon="fa fa-thumbs-up" color="success" header="Hired" value="0" invert>This applicant have passed all the SIRCLO's recruitment process</Widget04>
        );
      } else if (this.state.lamaran.tahapan === 'Rejected') {
        stage = (
          <Widget04 icon="fa fa-thumbs-down" color="danger" header="Rejected" value="0" invert>This applicant have been rejected from the SIRCLO's recruitment process</Widget04>
        );
      }

    }

    return (
      <div className="animated fadeIn">
        <div align="center">
          <h3>Applicant's Profile</h3>
        </div>
        <br/>
        <Row>
          <Col lg={8}>
            <Card >
              <CardHeader>
                <i className="fa fa-user pr-1"></i> {this.state.lamaran.pelamar} <Badge color="secondary">
                Candidate {this.state.lamaran.lowongan}</Badge> <Badge color="info" pill id="Phase">
                {this.state.lamaran.tahapan}: {this.state.lamaran.status}</Badge>
                <Tooltip placement="top" isOpen={this.state.toolTipPhase} target="Phase" toggle={this.togglePhase}>
                  Current phase and its status
                </Tooltip>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col lg={12}>
                    <Card body>
                      {content}
                    </Card>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col lg={4}>
            {stage}
          </Col>
        </Row>
      </div>
    );
  }
}

export default Applicants;
