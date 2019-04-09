import React from 'react';
import { Redirect } from 'react-router-dom';
import {
  Card,
  CardBody,
  CardHeader,
  Badge
} from 'reactstrap';

import 'antd/dist/antd.css';
import { Form, Col, Row } from 'antd';
import axios from 'axios';
import  AppointmentForm from './AppointmentForm';


export default class AddAppointment extends React.Component{
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      loading : true,
      lowonganDidaftar : '',
      namaPelamar : '',
    };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState }});
  }

  componentDidMount(){
    this.getDetailApplicant();
  }

  getDetailApplicant = () => {
    axios.get('http://localhost:8000' + '/po/get-detail-applicant/' + this.props.match.params.id)
      .then((response) => {
        const namaLowongan = response.data.lowongan;
        const namaPelamar = response.data.nama_pelamar;
        this.setState({
          lowonganDidaftar : namaLowongan,
          namaPelamar : namaPelamar,
          loading: false
        });
      });
  }

  render() {
    if (localStorage.getItem('role') != 'admin') {
      return <Redirect to="/vacancies-applicant" />
    }

    const FormAppointment = Form.create({ name: 'appointment' })(AppointmentForm);
    return (
      <div className="animated fadeIn">
          <Row>
            <Col align="center">
              <h2><strong>Add Appointment</strong></h2>
            </Col>
          </Row>
          <Row>
          <Col span={12} offset={6}>
            <Card>
              <CardHeader>
                <div>
                  <i className="fa fa-user pr-1"></i>
                  <Badge color="light">{this.state.namaPelamar}</Badge>
                  <Badge color="secondary">{this.state.lowonganDidaftar}</Badge>
                </div>
              </CardHeader>
              <CardBody>
                <FormAppointment idLamaran={this.props.match.params.id}/>
              </CardBody>
            </Card>
          </Col>
          </Row>
        </div>
      );
    }
}
