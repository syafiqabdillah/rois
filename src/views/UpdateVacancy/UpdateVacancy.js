import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import UpdateVacancyForm from './UpdateVacancyForm';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { Form } from 'antd';

class UpdateVacancy extends Component {

  constructor(props) {
    super(props);
    this.state = {
    lowongan:[]
    };
  }

  render() {
    const UpdateFormVacancy = Form.create({ name: 'vacancy' })(UpdateVacancyForm);
    return (
      <div className="animated fadeIn">
        <div align="center">
          <h3 fontFamily="Metropolis">Update Vacancy</h3>
          <br></br>
        </div>

        <Row>
          <Col sm="2">
          </Col>
          <Col sm="8">
            <Card >
              <CardBody>
              <UpdateFormVacancy id_lowongan ={this.props.match.params.id}/>
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

export default UpdateVacancy;
