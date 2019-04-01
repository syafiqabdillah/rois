import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, ButtonGroup, Col, Row } from 'reactstrap';

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
    console.log(this.props.link);
  }

  render() {
    const textStyle = {
      color : "#979797",
    };
    return (
      <div>
        <Button disabled={Boolean(this.props.error)} color="primary" onClick={this.toggle} size="lg" className="btn-pill" block>Submit</Button>
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
                <Button color="primary" size="lg" onClick={this.onSubmit.bind(this)} className="btn-pill" block>Yes, I am sure</Button>{' '}
            </Col>
            <Col sm="2"></Col>
          </Row>
          <br/>
          <Row>
            <Col xs="6" sm="2"></Col>
            <Col xs="6" sm="8">
                <Button outline color="danger" size="lg" onClick={this.toggle} className="btn-pill" block>No, I don't</Button>
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
