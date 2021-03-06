import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button, Badge, Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import ModalDelete from './ModalDelete';
import { MDBDataTable } from 'mdbreact';

const API = 'http://localhost:8000';

const data = {
  columns: [
    {
      label: "Vacancy's Name",
      field: 'nama',
      sort: 'asc',
  
    },
    {
      label: "Division",
      field: 'divisi',
      sort: 'asc',
   
    },
    // {
    //   label: "Location",
    //   field: 'lokasi',
    //   sort: 'asc',
      
    // },
    {
      label: "Type",
      field: 'tipe',
     
    },
    {
      label:"Status",
      field:'status',
    
    },

    {
      label: "Quota",
      field: 'needed',
    
    },
    {
      label: "Action",
      field: 'action',
   
    }

  ],
  rows: []
}


export class Vacancies extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lowongan: [],
      loading: true,
      id: ''
    }
  }

  componentDidMount() {
    axios.get(API + '/po/all-lowongan')
      .then(res => {
        const lowongan = res.data;
        this.setState({
          lowongan: lowongan,
          loading: false
        })
      })
  }

  render() {
    let content;
    let color_badge;

    if (this.state.loading) {
      content = <div align="center"><p>Loading . . .</p></div>;
    } else {
      let list_vacancy = this.state.lowongan.map((lowongan, index) => {
        if(lowongan.status === "Not Active"){
          color_badge="warning"

        }
        else{
          color_badge="success"
        }
        return (
          {
            nama: lowongan.nama,
            divisi: lowongan.divisi,
            // start_date: lowongan.start_date,
            // end_date: lowongan.end_date,
            // lokasi: lowongan.lokasi,
            tipe: lowongan.tipe,
            status :
            
            <Badge pill color={color_badge}>{lowongan.status}</Badge>,
            needed: lowongan.posisi_tersedia,
            action:
              <Row>

                  <Link to={"/vacancy/" + lowongan.id} className=" btn btn-primary btn-pill">
                    <i className="cui-magnifying-glass icons " title="See Details"></i>
                  </Link>
                  &nbsp;&nbsp;

                  <Link to={"/vacancy/update/" + lowongan.id} className=" btn btn-primary btn-pill">
                    <i className="cui-pencil icons " title="Update Vacancy"></i>
                  </Link>

                  &nbsp;&nbsp;
                  <ModalDelete isDirujuk={lowongan.isDirujuk} name={lowongan.nama} id={lowongan.id} />

              </Row>
          }
        );
      });

      data.rows = [];

      for (var i = 0; i < list_vacancy.length; i++) {
        data.rows.push(list_vacancy[i]);
      }

      content = (
        <MDBDataTable borderless striped hover small btn data={data} />
      );
    }


    return (
      <div className="animated fadeIn">
        <div align="center">
          <h3>Vacancies</h3>
        </div>
        <Link to="/addVacancy">
          <Button color="primary" className="btn-pill" >Add Vacancy</Button>
        </Link>
        <br></br>
        <br></br>
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Vacancies List
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

export default Vacancies;
