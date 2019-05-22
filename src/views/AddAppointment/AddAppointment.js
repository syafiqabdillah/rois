import React from 'react';
import { Redirect } from 'react-router-dom';
import {
  Badge
} from 'reactstrap';

import 'antd/dist/antd.css';
import { Card, Form, Col, Row, Avatar } from 'antd';
import axios from 'axios';
import  AppointmentForm from './AppointmentForm';

const { Meta } = Card;

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
      emailPelamar : ''
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
    axios.get('http://localhost:8000/po/get-detail-applicant/' + this.props.match.params.id)
      .then((response) => {
        const namaLowongan = response.data.lowongan;
        const namaPelamar = response.data.nama_pelamar;
        const emailPelamar = response.data.email;
        this.setState({
          lowonganDidaftar : namaLowongan,
          namaPelamar : namaPelamar,
          emailPelamar : emailPelamar,
          loading: false
        });
      });
  }


  render() {
    if (localStorage.getItem('role') !== 'ADMIN') {
      return <Redirect to="/vacancies-applicant" />
    }

    let candidate = "Candidate " + this.state.lowonganDidaftar

    const FormAppointment = Form.create({ name: 'appointment' })(AppointmentForm);

    return (
      <div className="animated fadeIn">
        <div align="center">
          <h3>Add Appointment</h3>
          <br/>
        </div>
        <Row type="flex" justify="center" style={{ marginBottom: 16 }}>
          <Col span={15}>
            <Card hoverable loading={this.state.loading}>
              <Meta style={{ marginBottom: 16 }}
                avatar={<Avatar size="large" src="https://media.licdn.com/dms/image/C5103AQFW-mGVUjhbng/profile-displayphoto-shrink_800_800/0?e=1564012800&v=beta&t=c_mIO5Lj6NKJdvYGFGejzaTSfvcZ7MJwYwiwdWth8-U" />}
                title={this.state.namaPelamar}
                description={candidate}
              />
              <br/>
              <FormAppointment idLamaran={this.props.match.params.id} emailPelamar={this.state.emailPelamar}/>
            </Card>
          </Col>
        </Row>
      </div>
      );
    }
}
