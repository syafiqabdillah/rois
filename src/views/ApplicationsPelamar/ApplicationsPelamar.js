import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  Card, CardBody, Col, Row, Spinner
} from 'reactstrap';
import { MDBDataTable } from 'mdbreact';

const API = 'http://localhost:8000';
const TOKEN = localStorage.getItem('token');


class ApplicationsPelamar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      lamaran: []
    }
  }

  componentDidMount() {
    let url = API + '/pelamar/get-lamaran/' + TOKEN;
    axios.get(url)
      .then((response) => {
        this.setState({
          loading: false,
          lamaran: response.data
        })
      })
  }

  handleRowClick(id) {
    window.location = "/#/applicants/" + id;
  };

  render() {

    let table;
    if (this.state.loading) {
      table = (<div align="center">
        <Spinner color="primary" style={{ width: '3rem', height: '3rem' }} />
      </div>)
    } else {
      let list_lamaran = this.state.lamaran.map((lamaran, index) => {
        return (
          {
            lowongan: lamaran[0],
            tahapan: lamaran[1],
            status: lamaran[2],
            created_date: lamaran[4],
            action: <Link to={"/applicants/" + lamaran[3] } className=" btn btn-primary btn-pill">
                      <i className="cui-magnifying-glass icons " title="See Details"></i>
                    </Link>,
            clickEvent: () => this.handleRowClick(lamaran[3]),
          }
        );
      });

      data.rows = [];

      for (var i = 0; i < list_lamaran.length; i++) {
        data.rows.push(list_lamaran[i]);
      }

      table = (
        <MDBDataTable borderless striped hover small btn data={data} />
      );
    }

    return (
      <div className="animated fadeIn">

        <div align="center">
          <h2>My Applications</h2>
          <br></br>
        </div>
        <Row>
          <Col sm="14" md={{ size: 6, offset: 3 }}>
            <Card outline color="primary">
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

const data = {
  columns: [
    {
      label: "Vacancy",
      field: 'lowongan',
      sort: 'asc',
      width: 150
    },
    {
      label: 'Phase',
      field: 'tahapan',
      sort: 'asc',
      width: 200
    },
    {
      label: 'Status',
      field: 'status',
      sort: 'asc',
      width: 200
    },
    {
      label: 'Submitted Date',
      field: 'created_date',
      sort: 'asc',
      width: 200
    },
    
  ],
  rows: []
};

export default ApplicationsPelamar;
