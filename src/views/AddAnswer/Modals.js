import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, ButtonGroup, Col, Row } from 'reactstrap';
import 'antd/dist/antd.css';
import { message, Button } from 'antd';

class Modals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      //linkGit : '',

    };

    this.toggle = this.toggle.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  // handleSubmit = (link) => {
  //   this.setState({
  //     linkGit: link
  //   });
  //   console.log(this.state.linkGit)
  // }

  onSubmit(){
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
    message.info('Message', 9);
    message.loading('Saving...', 4)
    .then(() => message.success('Saving finished', 2.5))
    .then(() => message.success('Your submission have been recorded', 2.5));
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

export default Modals;
