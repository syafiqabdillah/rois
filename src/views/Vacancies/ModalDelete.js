import React from 'react';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, Col, Row } from 'reactstrap';
import Tooltip from '@material-ui/core/Tooltip';

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
    axios.post('http://localhost:8000/po/delete-lowongan', qs.stringify({
      'id': this.props.id
    }),
    {
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
    .then(function (response) {
      //handle success, munculin data
      console.log(response);
      window.location.href = '#/vacancies';
      window.location.reload();
    })
    .catch(function(response){
      window.alert('gagal hapus karena ada soal')
    })
  }


  render() {
    const textStyle = {
      color : "#979797",
    };
    let deleteVacancy;

    if(window.location.href === "http://localhost:3000/#/vacancies"){
      if(this.props.isDirujuk){
        deleteVacancy = (
          <Tooltip  placement="bottom" title="You don't have permission to delete this vacancy">
            <span>
            <Button outline disabled={Boolean(this.props.isDirujuk)} color="danger" onClick={this.toggle} className="btn-pill">
      <i className="cui-trash icons "></i>
      </Button>
            </span>
          </Tooltip>
        );
      } else {
        deleteVacancy =(
          <Button outline disabled={Boolean(this.props.isDirujuk)} color="danger" onClick={this.toggle} className="btn-pill">
      <i className="cui-trash icons "></i>
      </Button>
        )
      }
    }else{
      console.log("masoook")
      if(this.props.isDirujuk){
        deleteVacancy = (
          <Tooltip  placement="bottom" title="You don't have permission to delete this vacancy">

            <Button outline disabled={Boolean(this.props.isDirujuk)} color="danger" onClick={this.toggle} className="btn-pill">
      <i className="cui-trash icons "></i>
      Delete Vacancy
      </Button>

          </Tooltip>
        );
      } else {
        deleteVacancy =(
          <Button outline disabled={Boolean(this.props.isDirujuk)} color="danger" onClick={this.toggle} className="btn-pill">
          <i className="cui-trash icons "></i>
          Delete Vacancy
          </Button>
        )
      }

    }


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
              <h4><strong>Are you sure you want to delete {this.props.name}?</strong></h4>
            </Col>
            <Col sm="2"></Col>
          </Row>
          <Row>
            <Col xs="6" sm="2"></Col>
            <Col xs="6" sm="8">
              <p style={textStyle}>This vacancy will be deleted permanently. You can't undo this action</p>
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
