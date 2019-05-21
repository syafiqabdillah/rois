import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ChooseCurrentStage from './ChooseCurrentStage';
import ChooseStages from './ChooseStages';
import Widget02 from '../Widgets/Widget02';
import Widget04 from '../Widgets/Widget04';
import { Badge, Table, Tooltip } from 'reactstrap';

import 'antd/dist/antd.css';
import { Modal, Progress, Card, Avatar, Row, Col } from 'antd';

const { Meta } = Card;

const API = 'http://localhost:8000';

class Applicants extends Component {
  constructor(props){
    super(props);

    this.state = {
      lamaran: [],
      loading: true,
      toolTipPhase: false,
      toolTipStatus: false,
      idActiveRemoteTest : null
    }

    this.togglePhase = this.togglePhase.bind(this);
  }

  componentDidMount(){
    axios.get(API + '/po/lamaran/' + this.props.match.params.id)
    .then(res => {
      const lamaran = res.data;
      console.log(lamaran);
      localStorage.setItem('tahapan', lamaran.tahapan)
      this.setState({
        lamaran: lamaran,
        loading: false
      })
    })
  }

  getIdRemoteTest = () => {
    axios.get(API + '/po/get-id-remote-test/' + this.props.match.params.id)
    .then(res => {
      this.setState({
        idActiveRemoteTest: res.data.id_remote_test,
      })
    })
  }

  togglePhase() {
    this.setState({
      toolTipPhase: !this.state.toolTipPhase
    });
  }

  render() {
    let content;
    let stage;

    if (this.state.loading){
      content = <div align="center"><p>Loading . . .</p></div>;
    } else {

      content = (
        <Table borderless size="sm">
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
              <td>: {this.state.lamaran.experiences}</td>
            </tr>
            <tr>
              <th scope="row">Skills</th>
              <td>: {this.state.lamaran.skills}</td>
            </tr>
            <tr>
              <th scope="row">Expected Salary</th>
              <td>: {this.state.lamaran.salary_exp}</td>
            </tr>
            <tr>
              <th scope="row">Resume</th>
              <td>: <a href={API + "/po/download-cv/" + this.state.lamaran.id}> Resume - {this.state.lamaran.pelamar}</a> </td>
            </tr>
            <tr>
              <th scope="row">About Me</th>
              <td>: {this.state.lamaran.cover_letter}</td>
            </tr>
          </tbody>
        </Table>
      );

      if (this.state.lamaran.status === 'Passed' && localStorage.getItem('role') === 'ADMIN') {
        stage = (
          <div>
            <ChooseStages lamaran={this.state.lamaran} />
          </div>
        );
      } else if (this.state.lamaran.tahapan === 'Remote Test' &&  this.state.lamaran.status === 'Assigned' && localStorage.getItem('role') === 'ADMIN') {
        stage = (
          <div>
            <ChooseCurrentStage lamaran={this.state.lamaran} />
            <Link to={"/remoteTest/" + this.state.lamaran.id}>
              <Widget02 header="Assigned" mainText="Waiting for applicant's answer" icon="fa fa-clock-o" color="warning" />
            </Link>
          </div>
        );
      } else if (this.state.lamaran.tahapan === 'Remote Test' &&  this.state.lamaran.status === 'Submitted' && localStorage.getItem('role') === 'ADMIN') {
        stage  = (
          <div >
            <ChooseCurrentStage lamaran={this.state.lamaran} />
            <Link to={"/remoteTest/" + this.state.lamaran.id}>
              <Widget02 header="Submitted" mainText="Click here to see the applicant's answer" icon="fa fa-check" color="info" />
            </Link>
          </div>
        );
      } else if (this.state.lamaran.status === 'Hired' && localStorage.getItem('role') === 'ADMIN') {
        stage = (
          <Widget04 icon="fa fa-thumbs-up" color="success" header="Hired" value="0" invert>
            This applicant has passed all SIRCLO's recruitment process
          </Widget04>
        );
      } else if (this.state.lamaran.status === 'Rejected' && localStorage.getItem('role') === 'ADMIN') {
        stage = (
          <Widget04 icon="fa fa-thumbs-down" color="danger" header="Rejected" value="0" invert>
            This applicant has been rejected from SIRCLO's recruitment process
          </Widget04>
        );
      } else if (localStorage.getItem('role') === 'ADMIN') {
        stage = (
          <div>
            <ChooseCurrentStage lamaran={this.state.lamaran} />
          </div>
        );
      } else if (localStorage.getItem('role') === 'PELAMAR' && this.state.lamaran.tahapan === 'Remote Test' &&  this.state.lamaran.status === 'Assigned') {
        this.getIdRemoteTest();
        console.log(this.state.idActiveRemoteTest);
        stage = (
          <Link to={"/addanswer/" + this.state.idActiveRemoteTest}>
            <Widget02 header="Coding Test" mainText="Click here to start test" icon="fa fa-code" color="info" />
          </Link>
        );
      } else if (localStorage.getItem('role') === 'PELAMAR' && this.state.lamaran.tahapan === 'Remote Test' &&  this.state.lamaran.status === 'Submitted') {
        stage = (
          <Widget02 header="Coding Test" mainText="Your coding answer under review" icon="fa fa-code" color="info" />
        );
      }
    }

    let candidate = "Candidate " + this.state.lamaran.lowongan

    return (
      <div className="animated fadeIn">
        <div align="center">
          <h3>Applicant's Profile</h3>
        </div>
        <br/>
        <Row type="flex" justify="center" style={{ marginBottom: 16 }}>
          <Col span={15}>
            <Card hoverable loading={this.state.loading}>
              <Meta style={{ marginBottom: 16 }}
                avatar={<Avatar size="large" src="https://media.licdn.com/dms/image/C5103AQFW-mGVUjhbng/profile-displayphoto-shrink_800_800/0?e=1564012800&v=beta&t=c_mIO5Lj6NKJdvYGFGejzaTSfvcZ7MJwYwiwdWth8-U" />}
                title={this.state.lamaran.pelamar}
                description={candidate}
              />
              <h4><Badge color="info" pill id="Phase">{this.state.lamaran.tahapan}: {this.state.lamaran.status}</Badge></h4>
              <Tooltip placement="right" isOpen={this.state.toolTipPhase} target="Phase" toggle={this.togglePhase}>
                Current phase and its status
              </Tooltip>
              <Row>
                <Col span={24}>
                  <Card loading={this.state.loading}>
                    {content}
                  </Card>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <Row type="flex" justify="center" style={{ marginBottom: 16 }}>
          <Col span={15}>
            {stage}
          </Col>
        </Row>
      </div>
    );
  }
}

export default Applicants;
