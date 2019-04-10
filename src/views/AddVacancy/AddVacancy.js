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
