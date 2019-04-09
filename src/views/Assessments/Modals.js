import React from 'react';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, Col, Row } from 'reactstrap';
import Tooltip from '@material-ui/core/Tooltip';
import 'antd/dist/antd.css';
import { message } from 'antd';

class Modals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  handleSubmit = (e) => {
    const data = this.state;
    e.preventDefault();
    console.log(data);

    var qs = require('qs');

    //post to backend
    axios.post('http://localhost:8000/po/delete-soal', qs.stringify({
      'id': this.props.id
    }),
    {
      // headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
    message.info('Message', 5.5)
    message.loading('Deleting...', 3)
    .then(() => message.success(this.props.name + ' has successfully deleted', 2.5))
    .then(() => window.location.reload())

    // .then(function (response) {
    //   //handle success, munculin data
    //   // console.log(response);
    //   message.info('Message', 9);
    //   message.loading('Saving...', 4)
    //   .then(() => message.success('Saving finished', 2.5))
    //   .then(() => message.success('Your submission have been recorded', 2.5));  
    //   // window.location.href = '#/assessments';
    //   // window.location.reload();
    // })
  }


  render() {
    const textStyle = {
      color : "#979797",
    };

    let buttonDelete;
    if(this.props.isDirujuk){
      buttonDelete = (
        <Tooltip title="There's a remote test referring to this assessment" >
          <span>
            <Button outline disabled={Boolean(this.props.isDirujuk)} color="danger" className="btn-pill cui-trash icons">
              {/* <i className="cui-trash icons"></i> */}
            </Button>
          </span>
        </Tooltip>
      );
    } else {
      buttonDelete = (
        <Button outline disabled={Boolean(this.props.isDirujuk)} color="danger" onClick={this.toggle} className="btn-pill cui-trash icons" >
          {/* <i className="cui-trash icons"></i> */}
        </Button>
      )
    }
    
    return (
      <div>
        {buttonDelete}
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>
          </ModalHeader>
          <ModalBody>
          <Row>
            <Col xs="6" sm="2"></Col>
            <Col xs="6" sm="8">
              <h4><strong>Are you sure you want to delete {this.props.name}?</strong></h4>
            </Col>
            <Col sm="2"></Col>
          </Row>
          <Row>
            <Col xs="6" sm="2"></Col>
            <Col xs="6" sm="8">
              <p style={textStyle}>This assessment will be deleted permanently. You can't undo this action</p>
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

export default Modals;
