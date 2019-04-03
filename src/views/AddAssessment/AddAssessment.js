import React, { Component } from 'react';
import axios from 'axios';
import { Button, Badge, Card, CardBody, CardHeader, Col,
  Form, FormGroup, FormText, Input, Label, Pagination, PaginationItem, PaginationLink, Row, Table, } from 'reactstrap';
import { isNull } from 'util';

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
    .then(function (response) {
      //handle success, munculin data
      console.log(response);
      window.location.href = '#/assessments';
      window.location.reload();
    })
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
                <Input type="text" name="name" id="name" placeholder="Enter Assessment Name" required onChange={this.handleInputChange}/>
              </FormGroup>
              <FormGroup>
                <Label for="vacancyID">Vacancy*</Label>
                <Input type="select" name="vacancyID" id="vacancyID" required onChange={this.handleInputChange}> 
                  <option value={isNull} selected disabled>-- Select Vacancy --</option>
                  {list_vacancy}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="link">Link*</Label>
                <Input type="text" id="link" name="link" placeholder="Enter Assessment Link" pattern="https?://.+" required onChange={this.handleInputChange}/>
                <FormText color="muted">
                  eg. https://www.google.com
                </FormText>              
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
