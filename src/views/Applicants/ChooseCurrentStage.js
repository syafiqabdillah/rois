import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table, CardTitle, CardText, Progress, Button } from 'reactstrap';

const API = 'http://localhost:8000';

class ChooseCurrentStage extends Component {
  constructor(props){
    super(props);

    this.state = {
      loading: true
    }

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount(){
    this.setState({
      loading: false
    })
  }

  handleClick = () => {

    if (window.confirm('Are you sure you want to pass this applicant on the current phase ?')) {
      console.log(this.props);

      // axios post
      var qs = require('qs');

      //post it to backend
      axios.post('http://localhost:8000/po/update-tahapan-lamaran', qs.stringify({
        'id': this.props.lamaran.id,
        'tahapan': this.props.lamaran.tahapan,
        'status': 'Passed',
      }),
      {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })
      .then(function (response) {
          console.log(response.data);
      })

      this.setState({
        lamaran: {
          status: 'Passed',
        }
      })

      window.location.reload();

    }
  }

  render() {
    let content;

    if (this.state.loading){
      content = <div align="center"><p>Loading . . .</p></div>;
    } else {
      content = (
        <div>
          <p>This applicant is at the <strong>{this.props.lamaran.tahapan}</strong> phase, choose one action: </p>
          <Row>
            <Col lg={1}>
            </Col>
            <Col lg={10}>
              <Link to={"/reject/" + this.props.lamaran.id}> <Button outline className="btn-pill" color="danger" block>Reject</Button> </Link>
            </Col>
            <Col lg={1}>
            </Col>
          </Row>
          <br/>
          <Row>
            <Col lg={1}>
            </Col>
            <Col lg={10}>
              <Button outline className="btn-pill" color="success" onClick={this.handleClick} block>Pass</Button>
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

export default ChooseCurrentStage;
