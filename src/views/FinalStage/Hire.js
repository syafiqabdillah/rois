import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Form, FormGroup, Label, Input, Button, FormText } from 'reactstrap';
import 'antd/dist/antd.css';
import { message, Modal, Card, Avatar, Row, Col } from 'antd';

const { Meta } = Card;

const API = 'http://localhost:8000';

class Hire extends Component {
  constructor(props){
    super(props);

    this.state = {
      lamaran: [],
      loading: true,
      confirmLoading: false,
      modalTitle: '',
      modalText: '',
      visible: false,
      additionalMessage: '',
    }

  }

  componentDidMount(){
    axios.get(API + '/po/lamaran/' + this.props.match.params.id)
    .then(res => {
      const lamaran = res.data;
      console.log(lamaran);
      this.setState({
        lamaran: lamaran,
        loading: false
      })
    })
  }

  handleInputChange = (e) => {
    e.preventDefault()
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  showModal = () => {
    this.setState({
      modalTitle: 'Hire the Applicant',
      modalText: 'Are you sure you want to hire this applicant?',
      visible: true,
    });
  };

  handleOk = () => {
    // axios post
    var qs = require('qs');

    //post it to backend
    axios.post('http://localhost:8000/po/update-tahapan-lamaran', qs.stringify({
        'id': this.state.lamaran.id,
        'tahapan': 'Hired',
        'status': 'Hired',
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(function(response) {
        //console.log(response.data);
      })

    message.info('Message', 5.5)
    message.loading('Saving changes...', 2.5)
    .then(() => message.success('Success! The Applicant has been successfully hired', 3))
    .then(() => window.location.href = '#/applications')
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
      <div>
        <p>The applicant above will be <strong>hired</strong> from the recruitment process. A notification email will be sent to the applicant.</p>
        <br/>
        <Form method="post" >
          {/* <FormGroup row>
            <Label for="offeringLetter" lg={3}>Offering Letter</Label>
            <Col span={15}>
              <Input type="file" name="file" id="offeringLetter" />
              <FormText color="muted">
                File size must not exceed 2MB.
              </FormText>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="additionalMessage" lg={3}>Additional Message</Label>
            <Col span={15}>
              <Input type="textarea" name="additionalMessage" id="additionalMessage" onChange={this.handleInputChange} />
            </Col>
          </FormGroup> */}
          <Row type="flex" justify="center">
            <Col span={7} style={{ margin: 5 }}>
              <Link to={"/applicants/" + this.state.lamaran.id}> <Button className="btn-pill" outline color="danger" block>Cancel</Button> </Link>
            </Col>
            <Col span={7} style={{ margin: 5 }}>
              <Button className="btn-pill" color="primary" block onClick={this.showModal}>Confirm</Button>
            </Col>
          </Row>
          <Modal
            title={this.state.modalTitle}
            visible={visible}
            onOk={this.handleOk}
            confirmLoading={confirmLoading}
            onCancel={this.handleCancel}
          >
            <p>{this.state.modalText}</p>
          </Modal>
        </Form>
      </div>
    );

    let candidate = "Candidate " + this.state.lamaran.lowongan

    return (
      <div className="animated fadeIn">
        <div align="center">
          <h3>Hire</h3>
        </div>
        <br />
        <Row type="flex" justify="center" style={{ marginBottom: 16 }}>
          <Col span={15}>
            <Card hoverable loading={this.state.loading}>
              <Meta style={{ marginBottom: 16 }}
                avatar={<Avatar size="large" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title={this.state.lamaran.pelamar}
                description={candidate}
              />
              {content}
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Hire;
