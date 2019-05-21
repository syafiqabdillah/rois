import React from 'react';
import axios from 'axios';
import { ButtonGroup, Button, Modal, ModalHeader, ModalBody, Col, Row } from 'reactstrap';
import 'antd/dist/antd.css';
import { message } from 'antd';

class ModalChangeStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      selected: '',
      status:'',
      message:''
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle(e) {
    this.setState({ selected: e.target.id });
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));
    console.log(this.state.selected);
    console.log('dipilih:', e.target.id);
    if(e.target.id==="reject"){
      this.setState({status : "On Progress", message : "Rejecting..."});
    }else if (e.target.id==="approve"){
      this.setState({status : "Approve", message : "Approving..."});
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    var qs = require('qs');

    //post to backend
    axios.post('http://localhost:8000/supervisor/change-task-status', qs.stringify({
      'tasksId': this.props.selectedTasks,
      'status': this.state.status
    }),
    {
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })

    this.setState(prevState => ({
      modal: !prevState.modal
    }));
    message.info('Message', 5.5)
    message.loading(this.state.message, 3)
    .then(() => message.success(this.props.items + ' task(s) has successfully ' + this.state.status, 2.5))
    .then(() => window.location.reload())
  }

  render() {
    const textStyle = {
      color : "#979797",
    };

    let buttonReject;
    buttonReject = (<Button id="reject" color="danger" onClick={this.toggle} disabled={!this.props.hasSelected}> Reject </Button>)
    let buttonApprove;
    buttonApprove = (<Button id="approve" color="primary" onClick={this.toggle} disabled={!this.props.hasSelected}> Approve </Button>)

    return (
      <div>
        <ButtonGroup>
          {buttonApprove}
          {buttonReject}
        </ButtonGroup>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>
          </ModalHeader>
          <ModalBody>
          <Row>
            <Col xs="6" sm="2"></Col>
            <Col xs="6" sm="8">
              <h4><strong>Are you sure you want to {this.state.selected} {this.props.items} task(s)?</strong></h4>
            </Col>
            <Col sm="2"></Col>
          </Row>
          <Row>
            <Col xs="6" sm="2"></Col>
            <Col xs="6" sm="8">
                <Button color="primary" size="lg" onClick={this.handleSubmit.bind(this)} className="btn-pill" block>Yes, I am sure</Button>{' '}
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

export default ModalChangeStatus;
