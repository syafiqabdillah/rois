import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import ModalDelete from './ModalDelete';

const API = 'http://localhost:8000';

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
        console.log(res);
        const lowongan = res.data;
        this.setState({
          lowongan: lowongan,
          loading: false
        })
      })
  }



  render() {
    let content;

    if (this.state.loading) {
      content = <div align="center"><p>Loading . . .</p></div>;
    } else {
     let list_vacancy = this.state.lowongan.map((lowongan, index) => {
       console.log(lowongan.isDirujuk)
        return (
          <tr key={index}>
            <td> <Link to={"/vacancy/" + lowongan.id} >{lowongan.nama}</Link> </td>
            <td> {lowongan.divisi} </td>
            <td> {lowongan.start_date} </td>
            <td> {lowongan.end_date} </td>
            <td> {lowongan.publish_date} </td>
            <td> {lowongan.lokasi} </td>
            <td> {lowongan.tipe} </td>
            <td>
              <Row>
              <Col>
              <Link to = {"/vacancy/edit/"+ lowongan.id}  className=" btn btn-primary btn-pill">
              <i className="cui-pencil icons "></i>
              </Link>
              </Col>
              <Col>
              <ModalDelete isDirujuk={lowongan.isDirujuk} name={lowongan.nama} id={lowongan.id}/>
            
              </Col>
              </Row>
             
              </td>
          </tr>
        );
      });

      content = (
        <Table hover bordered striped responsive size="sm">
          <thead>
            <tr>
              <th>Name</th>
              <th>Division</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Publish Date</th>
              <th>Location</th>
              <th>Type</th>
              <th> Action</th>
            </tr>
          </thead>
          <tbody>
            {list_vacancy}
          </tbody>
        </Table>
      );
    }

    return (
      <div className="animated fadeIn">

        <div align="center">
          <h3>Vacancies</h3>
        </div>


        <Link to="/addVacancy">
          <Button color="primary" className="btn-pill">Add Vacancy</Button>
        </Link>
        <br></br>
        <br></br>

        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Vacancy List
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
