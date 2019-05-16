import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'reactstrap';

import 'antd/dist/antd.css';
import { Modal, Card, Row, Col, message } from 'antd';

class ChooseCurrentStage extends Component {
  constructor(props){
    super(props);

    this.state = {
      loading: true,
      confirmLoading: false,
      modalTitle: '',
      modalText: '',
      visible: false,
    }

  }

  componentDidMount(){
    this.setState({
      loading: false
    })
  }

  showModal = () => {
    this.setState({
      modalTitle: 'Pass the Applicant',
      modalText: 'Are you sure you want to pass this applicant on the current phase?',
      visible: true,
    });
  };

  handleOk = () => {
    // axios post
    var qs = require('qs');

    //post it to backend
    axios.post('http://localhost:8000/po/update-tahapan-lamaran', qs.stringify({
        'id': this.props.lamaran.id,
        'tahapan': this.props.lamaran.tahapan,
        'status': 'Passed',
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(function (response) {
        //console.log(response.data);
      })

    message.info('Message', 5.5)
    message.loading('Saving changes...', 2.5)
    .then(() => message.success('Success! The Applicant has been passed from the current phase', 3))
    .then(() => window.location.reload())
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    let { visible, confirmLoading } = this.state;

    let content;

    content = (
      <div >
        <Row type="flex" justify="center">
          <p>This applicant is at the <strong>{this.props.lamaran.tahapan}</strong> phase, choose one action: </p>
        </Row>
        <Row type="flex" justify="center">
          <Col span={7} style={{ margin: 5 }}>
            <Link to={"/reject/" + this.props.lamaran.id}> <Button outline className="btn-pill" color="danger" block>Reject</Button> </Link>
          </Col>
          <Col span={7} style={{ margin: 5 }}>
            <Button outline className="btn-pill" color="success" onClick={this.showModal} block>Pass</Button>
          </Col>
          <Modal
            title={this.state.modalTitle}
            visible={visible}
            onOk={this.handleOk}
            confirmLoading={confirmLoading}
            onCancel={this.handleCancel}
          >
            <p>{this.state.modalText}</p>
          </Modal>
        </Row>
      </div>
    );

    return (
      <div className="animated fadeIn">
        <Card hoverable loading={this.state.loading} style={{ marginBottom: 16 }}>
          {content}
        </Card>
      </div>
    );
  }

}

export default ChooseCurrentStage;
