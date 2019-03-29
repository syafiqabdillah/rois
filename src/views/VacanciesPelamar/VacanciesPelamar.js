import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Button, Card, CardBody, CardHeader, Col, Row, Table, CardImg, CardTitle, CardText, CardDeck, CardGroup,
  CardSubtitle, CardColumns, Form, FormGroup, Label, Input
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
    axios.get(API + '/po/all-lowongan')
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
      content = <div align="center"><p>Loading . . .</p></div>;
    } else {
      let list_vacancy = this.state.lowongan.map((lowongan) => { 

        let list_res = lowongan.responsibility.map((res) => {
          return (
            <ul>
              <li> {res.deskripsi} </li>
            </ul>
          );
        });

        let list_req = lowongan.requirement.map((req) => {
          return (
            <ul>
              <li> {req.deskripsi} </li>
            </ul>
          );
        });

        return (
          <Card body outline color="primary">
            <CardBody>
              <h2>{lowongan.nama}</h2>
              <br></br>
              <h5>RESPONSIBILITIES</h5>
              {list_res}
              <br></br>
              <h5>REQUIREMENTS</h5>
              {list_req}

              <a href='/'>see details</a>
              <br></br>
              <br></br>
              <div align="center">
                <Button color="primary" className="btn-pill" onClick={() => this.handleOnClick(lowongan.id)}>APPLY NOW</Button>
              </div>

            </CardBody>
          </Card>
        );
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

