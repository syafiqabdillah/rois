import React, { Component } from 'react';
import axios from 'axios';
import { Button, Card, CardBody, Col, Form, FormGroup, Input, Label, Row} from 'reactstrap';
import { isNull } from 'util';
import 'antd/dist/antd.css';
import { message } from 'antd';

class UpdateAssessment extends Component {
  constructor(props){
    super(props);
    this.state = {
      lowongan: [],
      id: '',
      name: '',
      link: '',
      vacancyID: '',
      creator: '',
    }
  }

  componentDidMount(){
    let profile = localStorage.getItem('role');
    let soal = JSON.parse(localStorage.getItem('soal'));

    this.setState({
      id: soal.id,
      name: soal.nama,
      link: soal.link,
      vacancyID: soal.id_lowongan,
      creator: profile,
    })

    axios.get('http://localhost:8000/po/all-lowongan')
    .then(res => {
      const lowongan = res.data;
      this.setState({lowongan})
    })
  }

  handleSubmit = (e) => {
    const data = this.state;
    e.preventDefault()
    console.log(data)

    var qs = require('qs');

    //post to backend
    axios.post('http://localhost:8000/po/update-soal', qs.stringify({
      'id': this.state.id,
      'nama': this.state.name,
      'link': this.state.link,
      'id_lowongan': this.state.vacancyID,
      'nama_karyawan': this.state.creator,
    }),
    {
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
    // .then(function (response) {
    //   //handle success, munculin data
    //   console.log(response);
    //   window.location.href = '#/assessments';
    //   window.location.reload();
    // })
    message.info('Message', 5.5)
    message.loading('Saving...', 3)
    .then(() => message.success(this.state.name + ' has successfully saved', 2.5))
    .then(() => window.location.href = '#/assessments')
    .then(() => window.location.reload())
  }

  handleInputChange = (e) => {
    e.preventDefault()
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  render() {
    let list_vacancy = this.state.lowongan.map((lowongan, index) => {
      return (
        <option key={index} selected={this.state.vacancyID === lowongan.id} value={lowongan.id}>{lowongan.nama}</option>
      );
    });

    return (
      <div className="animated fadeIn">
        <div align="center">
          <h3 fontFamily="Metropolis">Add Assessment</h3>
        </div>
        <Card>
          <CardBody>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label for="name">Name*</Label>
                <Input type="text" name="name" id="name" placeholder="eg. UI/UX Assessment v.1" pattern="(?=.*[a-z]).{5,}" title="Can't contain numbers only, must contain at least 5 or more characters" defaultValue={this.state.name} onChange={this.handleInputChange} required/>
                {/* <FormText color="muted">
                  eg. UI/UX Assessment v1
                </FormText>  */}
              </FormGroup>
              <FormGroup>
                <Label for="vacancyID">Vacancy*</Label>
                <Input type="select" name="vacancyID" id="vacancyID" required onChange={this.handleInputChange}>
                  <option value={isNull} disabled>Select Vacancy..</option>
                  {list_vacancy}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="link">Link*</Label>
                <Input type="text" id="link" name="link" placeholder="eg. https://www.google.com" pattern="https?://.+" title="Include http://" defaultValue={this.state.link} onChange={this.handleInputChange} required/>
                {/* <FormText color="muted">
                  eg. https://www.google.com
                </FormText>  */}
              </FormGroup>
              <Row>
                  <Col xs="4">
                  </Col>
                  <Col xs="4">
                  </Col>
                  <Col xs="4">
                    <Button block color="primary" className="btn-pill" type="submit">Submit</Button>
                  </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default UpdateAssessment;
