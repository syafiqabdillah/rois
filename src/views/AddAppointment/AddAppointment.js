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
    this.getDetailLamaran();
  }

  getDetailLamaran = () => {
    axios.get('http://localhost:8000' + '/po/lamaran/' + this.props.match.params.id)
      .then((response) => {
        const idLowongan = response.data.id_lowongan;
        const tokenPelamar = response.data.token_pelamar;
        this.getDetailApplicant(idLowongan, tokenPelamar);
      });
  }

  getDetailApplicant = (idLowongan, tokenPelamar) => {
    axios.all([
      axios.get('http://localhost:8000' + '/po/lowongan/' + idLowongan),
      axios.get('http://localhost:8000' + '/pelamar/get-profile/' + tokenPelamar)
    ])
      .then(axios.spread((lowongan, pelamar) => {
        // do something with both responses
        const namaLowongan = lowongan.data.nama;
        const namaPelamar = pelamar.data[0].nama;
        console.log(pelamar);
        this.setState({
          lowonganDidaftar : namaLowongan,
          namaPelamar : namaPelamar,
          loading: false
        });
      }));
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
                <FormAppointment />
              </CardBody>
            </Card>
          </Col>
          </Row>
        </div>
      );
    }
}
