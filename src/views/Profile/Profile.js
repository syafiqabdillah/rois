import React, { Component } from 'react';
import axios from 'axios';
import { Card, CardBody, Col, Row, Spinner } from 'reactstrap';
import '../../css/jquery.dataTables.css'

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
      let image = (
        <img id='profileImg' src={ profile.imageUrl } alt='Profile Pic'></img>
      )

      return (
        <div className="animated fadeIn">
          <div align="center">
            <h2>My Profile</h2>
            <br></br>
          </div>
          <Row>
            <Col sm="12" md={{ size: 6, offset: 3 }}>
              <Card outline color="primary">
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
