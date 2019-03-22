import React, { Component } from 'react';
import axios from 'axios';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';

const API = 'http://localhost:8000';

class Applications extends Component {
  constructor(props){
    super(props);

    this.state = {
      lamaran: []
    }
  }

  componentDidMount(){
    axios.get(API + '/po/all-lamaran')
    .then(res => {
      const lamaran = res.data;
      this.setState({lamaran})
    })
  }

  render() {
    var list_lamaran = this.state.lamaran;
    const list = list_lamaran.map((lamaran) =>
    <tr>
      <td> {lamaran.token_pelamar} </td>
      <td> {lamaran.salary_exp} </td>
      <td> {lamaran.tahapan} </td>
      <td> {lamaran.status} </td>
    </tr>
    );
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Application List
              </CardHeader>
              <CardBody>
                <Table hover bordered striped responsive size="sm">
                  <thead>
                  <tr>
                    <th>Token (nanti diganti)</th>
                    <th>Salary Expectation</th>
                    <th>Tahapan</th>
                    <th>Status</th>
                  </tr>
                  </thead>
                  <tbody>
                    {list}
                  </tbody>
                </Table>
                <nav>
                  <Pagination>
                    <PaginationItem><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
                    <PaginationItem active>
                      <PaginationLink tag="button">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem><PaginationLink tag="button">2</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>
                  </Pagination>
                </nav>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Applications;
