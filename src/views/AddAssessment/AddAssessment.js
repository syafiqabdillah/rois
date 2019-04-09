import React, { Component } from 'react';
import axios from 'axios';
import { Button, Card, CardBody, Col, Form, FormGroup, FormText, Input, Label, Row } from 'reactstrap';
import { isNull } from 'util';
import 'antd/dist/antd.css';
import { message } from 'antd';

class AddAssessment extends Component {
  constructor(props){
    super(props);
    this.state = {
      lowongan: [],
      name: '',
      link: '',
      vacancyID: '',
      creator: '',
    }
  }

  componentDidMount(){
    let role = localStorage.getItem('role');
    console.log(role);

    this.setState({
      creator: role
    })

    axios.get('http://localhost:8000/po/all-lowongan')
    .then(res => {
      const lowongan = res.data;
      this.setState({lowongan})
    })
  }

  handleSubmit = (e) => {
    const data = this.state;
    e.preventDefault();
    console.log(data);

    var qs = require('qs');

    //post to backend
    axios.post('http://localhost:8000/po/create-soal', qs.stringify({
      'nama': this.state.name,
      'link': this.state.link,
      'id_lowongan': this.state.vacancyID,
      'nama_karyawan': this.state.creator,
    }),
    {
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
    message.info('Message', 5.5)
    message.loading('Saving...', 3)
    .then(() => message.success(this.state.name + ' has successfully saved', 2.5))
    .then(() => window.location.href = '#/assessments')
    .then(() => window.location.reload())

    // .then(function (response) {
    //   //handle success, munculin data
    //   console.log(response);
    //   message.info('Message', 9)
    //   message.loading('Saving...', 4)
    //   .then(() => message.success(this.state.name + ' succesfully created', 2.5))
    //   .then(() => window.location.href = '#/assessments'
    //   // window.location.reload();

    // })
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
        <option value={lowongan.id}>{lowongan.nama}</option>
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
                <Input type="text" name="name" id="name" placeholder="eg. UI/UX Assessment v.1" pattern="(?=.*[a-z]).{5,}" title="Can't contain numbers only, must contain at least 5 or more characters" onChange={this.handleInputChange} required/>
                {/* <FormText color="muted">
                  eg. UI/UX Assessment v1
                </FormText>  */}
              </FormGroup>
              <FormGroup>
                <Label for="vacancyID">Vacancy*</Label>
                <Input type="select" name="vacancyID" id="vacancyID" onChange={this.handleInputChange} required> 
                  <option value={isNull} selected disabled>-- Select Vacancy --</option>
                  {list_vacancy}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="link">Link*</Label>
                <Input type="text" id="link" name="link" placeholder="eg. https://www.google.com" pattern="https?://.+" title="Include http://" onChange={this.handleInputChange} required/>
                {/* <FormText color="muted">
                  eg. https://www.google.com
                </FormText>               */}
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

export default AddAssessment;
