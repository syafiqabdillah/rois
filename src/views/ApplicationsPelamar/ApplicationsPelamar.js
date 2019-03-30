import React, { Component } from 'react';
import axios from 'axios';
import {
  Card, CardBody, CardHeader, Col, Row
} from 'reactstrap';
import '../../css/jquery.dataTables.css'

const $ = require('jquery');
$.DataTable = require('datatables.net');

const API = 'http://localhost:8000';
const TOKEN = localStorage.getItem('token');
class ApplicationsPelamar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    let url = API + '/pelamar/get-lamaran/' + TOKEN;
    axios.get(url)
      .then((response) => {
        this.setState({
          loading: false
        })

        console.log(response.data)

        this.$el = $(this.el);
        this.$el.DataTable(
          {
            data: response.data,
            columns: [
              { title: "Vacancy" },
              { title: "Phase" },
              { title: "Status" }
            ]
          }
        )
      })

  }


  render() {

    let table;
    if (this.state.loading) {
      table = <div>Loading...</div>;
    } else {
      table = (
        <table className="display" width="100%" ref={el => this.el = el}>
        </table>
      )
    }

    return (
      <div className="animated fadeIn">

        <div align="center">
          <h2>My Applications</h2>
          <br></br>
        </div>
        <Row>
          <Col sm="14" md={{ size: 6, offset: 3 }}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Application List
              </CardHeader>
              <CardBody>
                {table}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ApplicationsPelamar;

