import React from 'react';
import { Modal, ModalHeader, ModalBody, Col, Row } from 'reactstrap';
import 'antd/dist/antd.css';
import { Button } from 'antd';
import axios from 'axios';
import moment from 'moment';

export default class ConfirmationStartTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      idRemoteTest : this.props.idRemoteTest,
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  onSubmit(){
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
    const startTime = new Date();
    console.log(moment(startTime).format('YYYY-MM-DD HH:mm:ss'));
    var qs = require('qs');
    axios.post('http://localhost:8000/pelamar/record-start-test', qs.stringify({
      'id': this.state.idRemoteTest,
      'start_date' : moment(startTime).format("YYYY-MM-DD HH:mm:ss"),
    }),
    {
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
    .then(function(response){
      console.log('start rt')
      console.log(response)
    })
    window.location.reload();
  }

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.toggle} shape="round" block>Start Test</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>
          </ModalHeader>
          <ModalBody>
          <Row>
            <Col xs="6" sm="2"></Col>
            <Col xs="6" sm="8">
              <h4><strong>Are you sure want to start test?</strong></h4>
            </Col>
            <Col sm="2"></Col>
          </Row>
          <Row>
            <Col xs="6" sm="2"></Col>
            <Col xs="6" sm="8">
                <Button type="primary" size="lg" onClick={this.onSubmit.bind(this)} shape="round" block>Yes, I am sure</Button>{' '}
            </Col>
            <Col sm="2"></Col>
          </Row>
          <br/>
          <Row>
            <Col xs="6" sm="2"></Col>
            <Col xs="6" sm="8">
                <Button type="danger" size="lg" onClick={this.toggle} shape="round" block ghost>No, I don't</Button>
            </Col>
            <Col sm="2"></Col>
          </Row>
          <br/>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
