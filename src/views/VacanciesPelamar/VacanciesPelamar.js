import React, { Component } from 'react';
import axios from 'axios';
import {
  Button, Card, CardBody, Col, Row, CardColumns, Form, FormGroup, Input, Spinner
} from 'reactstrap';

const API = 'http://localhost:8000';

class VacanciesPelamar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lowongan: [],
      loading: true,
      searchKey: ''
    }
  }

  handleInputChange = (e) => {
    e.preventDefault()

    this.setState({
      searchKey: e.target.value
    })

  }

  componentDidMount() {
    axios.get(API + '/po/all-active-lowongan')
      .then(res => {
        const lowongan = res.data;
        this.setState({
          lowongan: lowongan,
          loading: false,
        })
      })
  }

  handleOnClick(id) {
    let id_lowongan = id;
    localStorage.setItem('id_lowongan', id_lowongan);
    window.location.href = '#/apply/' + id_lowongan;
  }

  render() {
    let content;

    if (this.state.loading) {
      content = (<div align="center">
        <Spinner color="primary" style={{ width: '3rem', height: '3rem' }} />
      </div>);
    } else {
      let list_vacancy = this.state.lowongan.map((lowongan, index) => {
        if (lowongan.nama.toLowerCase().includes(this.state.searchKey.toLowerCase())) {
          let url_detail = '#/vacancy/' + lowongan.id;

          let list_res = lowongan.responsibility.map((res, index) => {
            return (
              <ul key={index}>
                <li> {res.deskripsi} </li>
              </ul>
            );
          });

          let list_req = lowongan.requirement.map((req, index) => {
            return (
              <ul key={index}>
                <li> {req.deskripsi} </li>
              </ul>
            );
          });
          return (
            <Card body outline color="primary" className="animated fadeIn" key={index}>
              <CardBody>
                <h2>{lowongan.nama}</h2>
                <br></br>
                <h5>RESPONSIBILITIES</h5>
                {list_res}
                <br></br>
                <h5>REQUIREMENTS</h5>
                {list_req}

                <a href={url_detail}>see details</a>
                <br></br>
                <br></br>
                <div align="center">
                  <Button color="primary" size="lg" className="btn-pill" onClick={() => this.handleOnClick(lowongan.id)}>APPLY NOW</Button>
                </div>

              </CardBody>
            </Card>
          );
        } else {
          return '';
        }
      });

      content = (
        <CardColumns>
          {list_vacancy}
        </CardColumns>
      );
    }

    return (
      <div className="animated fadeIn">

        <div align="center">
          <h2>JOIN US !</h2>
          <br></br>
        </div>

        <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <Form>
              <FormGroup>
                <Input
                  type="search"
                  name="searchKey"
                  id="exampleSearch"
                  placeholder="Find Jobs..."
                  onChange={this.handleInputChange}
                />
              </FormGroup>
            </Form>
          </Col>
        </Row>

        {content}

      </div>
    );
  }
}

export default VacanciesPelamar;

