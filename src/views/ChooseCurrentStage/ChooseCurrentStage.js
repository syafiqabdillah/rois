import React, { Component } from 'react';
import axios from 'axios';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table, CardTitle, CardText, Progress, Button } from 'reactstrap';

const API = 'http://localhost:8000';

class ChooseCurrentStage extends Component {
  constructor(props){
    super(props);

    this.state = {
      loading: true
    }
  }

  componentDidMount(){
    this.setState({
      loading: false
    })
  }

  render() {
    let content;

    if (this.state.loading){
      content = <div align="center"><p>Loading . . .</p></div>;
    } else {
      content = (
        <div>
          <p>This applicant is at the <strong>{this.props.tahapan}</strong> phase, choose one action: </p>
          <Row>
            <Col lg={1}>
            </Col>
            <Col lg={5}>
              <Button outline className="btn-pill" color="danger" size="sm" block>Reject</Button>
            </Col>
            <Col lg={5}>
              <Button outline className="btn-pill" color="success" size="sm" block>Pass</Button>
            </Col>
            <Col lg={1}>
            </Col>
          </Row>
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
