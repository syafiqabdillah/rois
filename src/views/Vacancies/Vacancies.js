import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button, Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';

const API = 'http://localhost:8000';

class Vacancies extends Component {
  constructor(props){
    super(props);

    this.state = {
      lowongan: [],
      loading: true
    }
  }

  componentDidMount(){
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

    if (this.state.loading){
      content = <div align="center"><p>Loading . . .</p></div>;
    } else {
      let list_vacancy = this.state.lowongan.map((lowongan) => {
        return (
          <tr>
            <td> {lowongan.nama} </td>
            <td> {lowongan.divisi} </td>
            <td> {lowongan.start_date} </td>
            <td> {lowongan.end_date} </td>
            <td> {lowongan.publish_date} </td>
            <td> {lowongan.lokasi} </td>
            <td> {lowongan.tipe} </td>
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
            <Button color="primary">Add Vacancy</Button>
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

            <div align="right">
              <Link to="/addVacancy">
                  <Button color="primary">Add Vacancy</Button>
              </Link>
            </div>

          </Col>
        </Row>
      </div>
    );
  }
}

export default Vacancies;
