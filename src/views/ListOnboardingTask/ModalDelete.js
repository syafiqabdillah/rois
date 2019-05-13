import React from 'react';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, Col, Row } from 'reactstrap';

class ModalDelete extends React.Component {
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
    console.log(this.props.id);
    axios.post('http://localhost:8000/supervisor/delete-tugas-onboarding', qs.stringify({
      'id': this.props.id
    }),
    {
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
    .then(function (response) {
      //handle success, munculin data
      console.log(response);
      window.location.reload();
    })
    .catch(function(response){
      window.alert('gagal hapus ')
    })
  }


  render() {
    const textStyle = {
      color : "#979797",
    };
    let deleteVacancy;

    
        deleteVacancy = (
         
            <Button outline disabled={Boolean(this.props.isDirujuk)} color="danger" onClick={this.toggle} className="btn-pill">
      <i className="cui-trash icons "></i>
      </Button>
           
        );
     

    


    return (
      <div>
        {deleteVacancy}
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>
          </ModalHeader>
          <ModalBody>
          <Row>
            <Col xs="6" sm="2"></Col>
            <Col xs="6" sm="8">
              <h4><strong>Are you sure you want to delete this task?</strong></h4>
            </Col>
            <Col sm="2"></Col>
          </Row>
          <Row>
            <Col xs="6" sm="2"></Col>
            <Col xs="6" sm="8">
              <p style={textStyle}>This task will be deleted permanently. You can't undo this action</p>
            </Col>
            <Col sm="2"></Col>
          </Row>
          <Row>
            <Col xs="6" sm="2"></Col>
            <Col xs="6" sm="8">
                <Button color="primary" size="lg" onClick={this.handleSubmit} className="btn-pill" block>Yes, I am sure</Button>{' '}
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

export default ModalDelete;
