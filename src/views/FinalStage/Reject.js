import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Badge, Form, FormGroup, Label, Input, Button, FormText } from 'reactstrap';
import 'antd/dist/antd.css';
import { message, Modal, Progress, Card, Avatar, Row, Col } from 'antd';

const { Meta } = Card;

const API = 'http://localhost:8000';

class Reject extends Component {
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
      modalTitle: 'Reject the Applicant',
      modalText: 'Are you sure you want to reject this applicant from the recruitment process?',
      visible: true,
    });
  };

  handleOk = () => {
    // axios post
    var qs = require('qs');

    //post it to backend
    var tahapan = localStorage.getItem('tahapan')

    axios.post(API + '/po/send-mail-reject', qs.stringify({
        'nama': this.state.lamaran.pelamar,
        'email': this.state.lamaran.detail_pelamar.email,
        'additionalMessage': this.state.additionalMessage,
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(function(response) {
        //console.log(response.data);
      })

    axios.post(API + '/po/update-tahapan-lamaran', qs.stringify({
        'id': this.state.lamaran.id,
        'tahapan': tahapan,
        'status': 'Rejected',
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
    .then(() => message.success('Success! The Applicant has been successfully rejected', 3))
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
        <p>The applicant above will be <strong>rejected</strong> from the recruitment process. A notification email will be sent to the applicant.</p>
        <br/>
        <Form method="post">
          <FormGroup row>
            <Label for="additionalMessage" lg={3}>Additional Message</Label>
            <Col span={15}>
              <Input type="textarea" name="additionalMessage" id="additionalMessage" onChange={this.handleInputChange}/>
            </Col>
          </FormGroup>
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
          <h3>Reject</h3>
        </div>
        <br />
        <Row type="flex" justify="center" style={{ marginBottom: 16 }}>
          <Col span={15}>
            <Card hoverable loading={this.state.loading}>
              <Meta style={{ marginBottom: 16 }}
                avatar={<Avatar size="large" src="https://media.licdn.com/dms/image/C5103AQFW-mGVUjhbng/profile-displayphoto-shrink_800_800/0?e=1564012800&v=beta&t=c_mIO5Lj6NKJdvYGFGejzaTSfvcZ7MJwYwiwdWth8-U" />}
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

export default Reject;
