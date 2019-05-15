import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, Col, Row, Button } from 'reactstrap';

class ChooseStages extends Component {
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
          <p>This applicant is currently <strong>not assigned to anything.</strong> Please choose the next step for this applicant to take: </p>
          <Row>
            <Col lg={1}>
            </Col>
            <Col lg={10}>
              <Link to={"/addappointment/" + this.props.lamaran.id}> <Button className="btn-pill" color="primary"  block>Interview</Button> </Link>
            </Col>
            <Col lg={1}>
            </Col>
          </Row>
          <br/>
          <Row>
            <Col lg={1}>
            </Col>
            <Col lg={10}>
              <Link to={"/remoteTest/" + this.props.lamaran.id}> <Button className="btn-pill" color="info"  block>Remote Test</Button> </Link>
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
