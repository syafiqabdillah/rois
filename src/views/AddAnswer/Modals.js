import React from 'react';
import { Modal, ModalHeader, ModalBody, Col, Row } from 'reactstrap';
import 'antd/dist/antd.css';
import { message, Button } from 'antd';
import axios from 'axios';
import { Redirect } from 'react-router-dom'

export default class Modals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      remoteTest : this.props.remoteTest

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

    console.log("props : ", this.props.link);
    message.info('Message', 5);
    var qs = require('qs');
    axios.post('http://localhost:8000/pelamar/submit-jawaban', qs.stringify({
      'id': this.state.remoteTest,
      'link_jawaban' : this.props.link,
    }),
    {
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    });
    message.loading('Saving...', 3)
    .then(() => message.success('Your submission have been recorded', 2))
    .then(() => window.location.reload());
  }

  renderRedirect = () => {
    let link = '/#/addanswer/'+ this.state.remoteTest;
    return <Redirect to={link} />
  }

  render() {
    const textStyle = {
      color : "#979797",
    };
    return (
      <div>
        <Button disabled={Boolean(this.props.error)} type="primary" onClick={this.toggle} shape="round" block>Submit</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>
          </ModalHeader>
          <ModalBody>
          <Row>
            <Col xs="6" sm="2"></Col>
            <Col xs="6" sm="8">
              <h4><strong>Are you sure want to submit?</strong></h4>
            </Col>
            <Col sm="2"></Col>
          </Row>
          <Row>
            <Col xs="6" sm="2"></Col>
            <Col xs="6" sm="8">
              <p style={textStyle}>if you choose yes, you can't change submission</p>
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
