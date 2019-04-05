import React, { Component } from 'react';
import axios from 'axios';
import ChooseCurrentStage from './ChooseCurrentStage';
import ChooseStages from './ChooseStages';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table, CardTitle, CardText, Progress } from 'reactstrap';

const API = 'http://localhost:8000';

class Applicants extends Component {
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
                <i className="fa fa-user pr-1"></i> {this.state.lamaran.pelamar} <Badge color="secondary">Candidate {this.state.lamaran.lowongan}</Badge> <Badge href="#" color="info" pill>{this.state.lamaran.tahapan}</Badge> <Badge href="#" color="warning" pill>{this.state.lamaran.status}</Badge>
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
            <ChooseCurrentStage lamaran={this.state.lamaran} />
            <ChooseStages lamaran={this.state.lamaran} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Applicants;
