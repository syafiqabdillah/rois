import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table, CardTitle, CardText, Progress, Button } from 'reactstrap';

const API = 'http://localhost:8000';

class ChooseStages extends Component {
  constructor(props){
    super(props);

    this.state = {
      loading: true
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    this.setState({
      loading: false
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    if (window.confirm('Are you sure you want to hire this applicant ?')){
      console.log(this.state);

      // axios post
      var qs = require('qs');

      //post it to backend
      axios.post('http://localhost:8000/po/update-tahapan-lamaran', qs.stringify({
        'id': this.state.lamaran.id,
        'tahapan': 'Hired',
        'status': 'Hired',
      }),
      {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })
      .then(function (response) {
          console.log(response.data);
      })

      this.setState({
        lamaran: {
          tahapan: 'Hired',
          status: 'Hired',
        }
      })

      window.location.href ='#/' +  + '/' + this.state.lamaran.id
      window.location.reload()

    }

  }

  render() {
    let content;

    if (this.state.loading){
      content = <div align="center"><p>Loading . . .</p></div>;
    } else {
      content = (
        <div>
          <p>Choose the next action for this applicant to take: </p>
          <Row>
            <Col lg={1}>
            </Col>
            <Col lg={10}>
              <Link to="/addappointment/"> <Button className="btn-pill" color="primary"  block>Interview</Button> </Link>
            </Col>
            <Col lg={1}>
            </Col>
          </Row>
          <br/>
          <Row>
            <Col lg={1}>
            </Col>
            <Col lg={10}>
              <Link to={"/remoteTestForm/" + this.props.lamaran.id}> <Button className="btn-pill" color="info"  block>Remote Test</Button> </Link>
            </Col>
            <Col lg={1}>
            </Col>
          </Row>
          <br/>
          <Row>
            <Col lg={1}>
            </Col>
            <Col lg={10}>
              <Link to={"/hire/" + this.props.lamaran.id}> <Button outline className="btn-pill" color="success"  block>Hire</Button> </Link>
            </Col>
            <Col lg={1}>
            </Col>
          </Row>
          <br/>
        </div>
      );
    }

    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={12}>
            <Card >
              <CardBody className="text-center">
                {content}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ChooseStages;
