import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import VacancyForm from './VacancyForm';
import axios from 'axios';
import {
  Button, Card, CardBody,
  FormGroup, Input, Label, Col, Row
} from 'reactstrap';
import 'antd/dist/antd.css';
import { Form } from 'antd';

class AddVacancy extends Component {

  // constructor(props) {

  //   super(props);

  //   this.state = {
  //     name: '',
  //     division: '',
  //     location: '',
  //     type: '',
  //     responsibilities: [],
  //     requirements: [],
  //     start_date: '',
  //     finish_date: '',
  //     publish_date: ''

  //   };

  // }

  // handleSubmit = (event) => {
  //   event.preventDefault()
  //   var qs = require('qs');
  //   axios.post('http://localhost:8000/po/create-lowongan', qs.stringify({
  //     'nama': this.state.name,
  //     'start_date': this.state.start_date,
  //     'end_date': this.state.finish_date,
  //     'publish_date': this.state.publish_date,
  //     'divisi': this.state.division,
  //     'lokasi': this.state.location,
  //     'tipe': this.state.type,
  //   }),
  //     {
  //       headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  //     })
  //     .then(response => {
  //       console.log(response)
  //     })
  //     .catch(error => {
  //       console.log(error.response)
  //     });

  //   window.location.href = '#/vacancies';
  // }


  // handleChange = (event) => {
  //   event.preventDefault()
  //   this.setState({
  //     [event.target.name]: event.target.value
  //   })
  // }

  // addResponsibility(){

  //   var list_responsibilities=this.state.responsibilities;  
  //   list_responsibilities.push('');
  //   this.setState({
  //   responsibiliities:list_responsibilities
  //   })
  //   }


  render() {
    const FormVacancy = Form.create({ name: 'vacancy' })(VacancyForm);
    return (
      <div className="animated fadeIn">
        <div align="center">
          <h3 fontFamily="Metropolis">Add Vacancy</h3>
          <br></br>
        </div>
        
        <Row>
          <Col sm="2">
          </Col>
          <Col sm="8">
            <Card >
              <CardBody>
              <FormVacancy />
            </CardBody>
          </Card>

          </Col>
            <Col sm="2">
          </Col>
        </Row>
      </div>
    );
  }
}

export default AddVacancy;
