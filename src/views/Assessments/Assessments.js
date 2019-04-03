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
      width: 150
    },
    {
      label: "Vacancy",
      field: 'lowongan',
      sort: 'asc',
      width: 200
    },
    {
      label: "Link",
      field: 'link',
      sort: 'asc',
      width: 270
    },
    {
      label: "Creator",
      field: 'nama_karyawan',
      sort: 'asc',
      width: 150
    },
    {
      label: "Created Date",
      field: 'created_date',
      sort: 'asc',
      width: 150
    },
    {
      label: "Action",
      field: 'action',
      width: 150
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
      // remoteTest: [],
      // remoteTestStatus: null
    }
  }

  // getRemoteTestStatus = (value) => {
  //   let list_remote_test = this.state.remoteTest.map((remoteTest, index)) => {
  //     if (remoteTest.idSoal == ){
  //       this.state.remoteTestStatus = false; //ada remote test yang menggunakan soal tsb
  //     }
  //   } 
  // }

  componentDidMount(){
    axios.get(API + '/po/all-soal')
    .then(res => {
      const soal = res.data;
      this.setState({
        soal: soal,
        loading: false
      })
    })
    // axios.get (API + '/po/all-remote-test')
    // .then(res => {
    //   const remoteTest = res.data;
    //   this.setState({
    //     remoteTest: remoteTest,
    //   })
    // })
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
      let list_soal = this.state.soal.map((soal, index) => {
        return (
          {
            nama: soal.nama,
            lowongan: soal.lowongan,
            link: 
              <a href={soal.link}>{soal.link}</a>,
            nama_karyawan: soal.nama_karyawan,
            created_date: soal.created_date,
            action: 
              <div>
                <Button color="primary" className="btn-pill" onClick={() => this.onClick(soal)}>Update</Button>
                <Modals isDirujuk={soal.isDirujuk} name={soal.nama} id={soal.id}/>
              </div> 
          }
        );
      });
      
      for (var i = 0; i < list_soal.length; i++) {
        data.rows.push(list_soal[i]);
      }

      content = (
        <MDBDataTable borderless striped hover small btn data={data} />
      );
    }

    return (
      <div className="animated fadeIn">
        <div align="center">
          <h3>Assessments</h3>
        </div>
        <Link to="/addAssessment">
            <Button color="primary">Add Assessment</Button>
        </Link>
        <br></br>
        <br></br>
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Assessment List
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
