import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import UpdateVacancyForm from './UpdateVacancyForm';
import axios from 'axios';
import {
  Button, Card, CardBody,
  FormGroup, Input, Label, Col, Row
} from 'reactstrap';
import { Form } from 'antd';

const API = 'http://localhost:8000';

class UpdateVacancy extends Component {

  constructor(props) {
    super(props);
    this.state = {
    lowongan:[]
    };
  }

componentDidMount() {
      axios.get(API + '/po/lowongan/' + this.props.match.params.id)
      .then(res => {
        // do something with both responses
        const lowongan = res.data;
        this.setState({
          lowongan: lowongan,
        })
      });
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
              <UpdateFormVacancy lowongan={this.state.lowongan}/>
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
