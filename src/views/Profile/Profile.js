import React, { Component } from 'react';
import axios from 'axios';
import {
  Card, CardBody, CardHeader, Col, Row, Spinner
} from 'reactstrap';
import '../../css/jquery.dataTables.css'
import { CardText } from 'mdbreact';

const $ = require('jquery');
$.DataTable = require('datatables.net');

const API = 'http://localhost:8000';
const TOKEN = localStorage.getItem('token');

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      pelamar: null
    }
  }

  componentDidMount() {
    //ambil data pelamar
    axios.get(API + '/pelamar/get-profile/' + TOKEN)
      .then((response) => {
        const pelamar = response.data[0];
        this.setState({
          loading: false,
          pelamar: pelamar
        })
      })
  }

  render() {

    if (this.state.loading) {
      return (
        <div align="center">
          <Spinner color="primary" style={{ width: '3rem', height: '3rem' }} />
        </div>
      )
    } else {
      let profile = JSON.parse(localStorage.getItem('profile'));
      let pelamar = this.state.pelamar
      console.log(pelamar);
      let image = (
        <img id='profileImg' src={profile.imageUrl}></img>
      )

      return (
        <div className="animated fadeIn">
          <div align="center">
            <h2>My Profile</h2>
            <br></br>
          </div>
          <Row>
            <Col sm="12" md={{ size: 6, offset: 3 }}>
              <Card>
                <CardBody>

                  <div align="center">
                    {image}
                    <h2>{pelamar.nama}</h2>
                    <h4>{pelamar.nik}</h4>
                    <h4>{pelamar.tempat_lahir}, {pelamar.tanggal_lahir}</h4>
                    <h4>{pelamar.phone} | {pelamar.email}</h4>
                    <h4>{pelamar.alamat}</h4>
                  </div>

              </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      )
    }
  }

}

export default Profile;

