import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button, Card, CardBody, CardHeader, Col, Row} from 'reactstrap';
import { MDBDataTable } from 'mdbreact';
import Modals from './Modals';

const API = 'http://localhost:8000';

const data = {
  columns: [
    {
      label: "Assessment's Name",
      field: 'nama',
      sort: 'asc',
    },
    {
      label: "Vacancy",
      field: 'lowongan',
      sort: 'asc',
    },
    {
      label: "Link",
      field: 'link',
      sort: 'asc',
    },
    {
      label: "Creator",
      field: 'nama_karyawan',
      sort: 'asc',
    },
    {
      label: "Created Date",
      field: 'created_date',
      sort: 'asc',
    },
    {
      label: "Action",
      field: 'action',
      sort: 'disabled'
    }
  ],
  rows: []
}

class Assessments extends Component {
  constructor(props){
    super(props);
    this.state = {
      soal: [],
      loading: true,
      modals : false,
    }
  }

  componentDidMount(){
    axios.get(API + '/po/all-soal')
    .then(res => {
      const soal = res.data;
      console.log(soal)
      this.setState({
        soal: soal,
        loading: false
      })
    })
  }

  onClick (soal){
    localStorage.setItem('soal', JSON.stringify(soal));
    window.location.href = '#/updateAssessment/' + soal.id;
  }

  render() {
    let content;

    if (this.state.loading){
      content = <div align="center"><p>Loading . . .</p></div>;
    } else {
      let list_soal = this.state.soal.map((soal) => {
        return (
          {
            nama: soal.nama,

            lowongan: soal.lowongan,

            link:
            <div style={{wordWrap: 'break-word', width:250, overflow: 'hidden'}}>
              <a href={soal.link}>{soal.link}</a>
            </div>,

            nama_karyawan: soal.nama_karyawan,

            created_date: soal.created_date,

            action:
            <div style={{width:110, overflow: 'hidden'}}>
              <Row>
                <Col>
                  <Button color="primary" onClick={() => this.onClick(soal)} className=" btn btn-primary btn-pill">
                    <i className="cui-pencil icons"></i>
                  </Button>

                </Col>
                <Col>
                  <Modals isDirujuk={soal.isDirujuk} name={soal.nama} id={soal.id} />
                </Col>
              </Row>
            </div>
              // <div>
              //   <Button color="primary" onClick={() => this.onClick(soal)}>
              //     <i className="cui-pencil icons"></i>
              //   </Button>

              //   <Modals isDirujuk={soal.isDirujuk} name={soal.nama} id={soal.id} />
              // </div>,
          }
        );
      });

      data.rows = []
      for (var i = 0; i < list_soal.length; i++) {
        data.rows.push(list_soal[i]);
      }

      content = (
        <MDBDataTable borderless
                      striped
                      hover
                      small
                      btn
                      data={data} />
      );
    }

    return (
      <div className="animated fadeIn">
        <div align="center">
          <h3>Assessments</h3>
        </div>
        <br></br>
        <Link to="/addAssessment">
            <Button color="primary" className="btn-pill">Add Assessment</Button>
        </Link>
        <br></br>
        <br></br>
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Assessments List
              </CardHeader>
              <CardBody>
                {content}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Assessments;
