import React, { Component } from 'react';
import axios from 'axios';
import ChooseCurrentStage from '../ChooseCurrentStage';
import ChooseStages from '../ChooseStages';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table, CardTitle, CardText, Progress } from 'reactstrap';

const API = 'http://localhost:8000';

class FinalStageNotification extends Component {
  constructor(props){
    super(props);

    this.state = {
      lamaran: [],
      loading: true
    }
  }

  componentDidMount(){
    axios.get(API + '/po/lamaran/' + this.props.match.params.id)
    .then(res => {
      const lamaran = res.data;
      console.log(lamaran);
      this.setState({
        lamaran: lamaran,
        loading: false
      })
    })
  }

  render() {
    let content;

    if (this.state.loading){
      content = <div align="center"><p>Loading . . .</p></div>;
    } else {

      content = (
        <div>
          yeet
        </div>
      );
    }

    return (
      <div className="animated fadeIn">
        <div align="center">
          <h3>Reject</h3>
        </div>
        <br />
        <Row>
          <Col lg={3}>
          </Col>
          <Col lg={6}>
            <Card >
              <CardHeader>
                <i className="fa fa-user pr-1"></i>{this.state.lamaran.pelamar} <Badge color="secondary">Candidate {this.state.lamaran.lowongan}</Badge>
              </CardHeader>
              <CardBody>
                <CardTitle>
                  The applicant above will be <strong>rejected</strong> from the recruitment process. <br /> A notification email will be sent to the applicant.
                </CardTitle>
                <CardText>
                  {content}
                </CardText>
              </CardBody>
            </Card>
          </Col>
          <Col lg={3}>
          </Col>
        </Row>
      </div>
    );
  }
}

export default FinalStageNotification;
