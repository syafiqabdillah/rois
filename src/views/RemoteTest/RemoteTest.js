import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Badge, Form, FormGroup, Label, Input, Button, FormText } from 'reactstrap';
import 'antd/dist/antd.css';
import { message, Modal, Progress, Card, Avatar, Row, Col } from 'antd';

const { Meta } = Card;

const API = 'http://localhost:8000';

class RemoteTest extends Component {

  constructor(props){
    super(props);

    this.state = {
      lamaran: [],
      soal: [],
      remote_test: [],
      id: [],
      id_lamaran: null,
      loading: true,
      duration: 0,
      tester_email: '',
      id_soal: null,
      start_date: null,
      status: '',
      link_jawaban: '',
      expired_date: null,
      confirmLoading: false,
      modalTitle: '',
      modalText: '',
      visible: false,
    }

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount(){
    axios.get(API + '/po/lamaran/' + this.props.match.params.id)
    .then(res => {
      const lamaran = res.data;
      console.log(lamaran);
      this.setState({
        lamaran: lamaran,
      })
    })

    axios.get(API + '/po/all-soal/')
    .then(res => {
      const soal = res.data;
      console.log(soal);
      this.setState({
        soal: soal,
        loading: false,
        id_soal: soal[0].id
      })
    })

    try {
      axios.get(API + '/po/get-id-remote-test/' + this.props.match.params.id)
      .then(res => {
        const id_remote_test = res.data;
        console.log(id_remote_test);
        this.setState({
          id: id_remote_test,
        })
      })
    } catch(err) {
      this.setState({
        id: [],
      })
    }

  }

  componentDidUpdate(prevProps, prevState){
    if (this.state.id != prevState.id) {
      axios.get(API + '/po/remote-test/' + this.state.id.id_remote_test)
      .then(res => {
        const remote_test = res.data;
        console.log(remote_test);
        this.setState({
          remote_test: remote_test,
        })
      })
    }
  }

  handleInputChange = (e) => {
    e.preventDefault()
    this.setState({
      [e.target.name]: e.target.value
    })
    console.log(this.state.id_soal);
  }

  showModal = () => {
    this.setState({
      modalTitle: 'Create the Remote Test',
      modalText: 'Are you sure you have entered the correct data?',
      visible: true,
    });
  };

  handleOk = () => {
    // axios post
    var qs = require('qs');

    //post it to backend
    axios.post(API + '/po/create-remote-test', qs.stringify({
        'id_lamaran': this.state.lamaran.id,
        'duration': this.state.duration,
        'tester_email': this.state.tester_email,
        'expired_date': this.state.expired_date,
        'id_soal': this.state.id_soal,
        'active': 'yes',
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(function(response) {
        console.log(response.data);
      })

    axios.post(API + '/po/update-tahapan-lamaran', qs.stringify({
        'id': this.state.lamaran.id,
        'tahapan': 'Remote Test',
        'status': 'Assigned',
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(function(response) {
        console.log(response.data);
      })

    message.info('Message', 5.5)
    message.loading('Saving changes...', 2.5)
    .then(() => message.success('Success! The Applicant has been successfully hired', 3))
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

    if (this.state.lamaran.tahapan === 'Remote Test' && this.state.lamaran.status === 'Assigned' && localStorage.getItem('role') === 'ADMIN') {

      content = (
        <div>
          <p>The answers for the assessment remote test of the applicant above is not available yet. Please be patient and <strong>wait for further notification.</strong></p>
          <Row>
            <Col span={15}>
              <Link to={"/applicants/" + this.state.lamaran.id}> <p>go to applicant's profile</p> </Link>
            </Col>
          </Row>
        </div>
      );

    } else if (this.state.lamaran.tahapan === 'Remote Test' && this.state.lamaran.status === 'Answered' && localStorage.getItem('role') === 'ADMIN') {

      content = (
        <div>
          <p>The answers for the assessment remote test of the applicant above can be accessed at this <a href={this.state.remote_test.link_jawaban}> github link. </a></p>
          <Row>
            <Col span={15}>
              <Link to={"/applicants/" + this.state.lamaran.id}> <p>go to applicant's profile</p> </Link>
            </Col>
          </Row>
        </div>
      );

    } else {

      let list_soal = this.state.soal.map((soal, index) => {
        return (
          <option key={index} value={soal.id}> {soal.nama} </option>
        );
      })

      content = (
        <div>
          <p>The applicant above will be given the remote test assessment below:</p>
          <br/>
          <Form method="post" >
            <FormGroup row>
              <Label for="duration" lg={3}>Duration (Days)</Label>
              <Col span={15}>
                <Input
                  type="number"
                  name="duration"
                  id="duration"
                  onChange={this.handleInputChange}
                  required
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="id_soal" lg={3}>Assessment File</Label>
              <Col span={15}>
                <Input type="select" default="Pilih" name="id_soal" id="id_soal" onChange={this.handleInputChange} required>
                  {list_soal}
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="tester_email" lg={3}>Tester's Email</Label>
              <Col span={15}>
                <Input type="email" name="tester_email" id="tester_email" onChange={this.handleInputChange} required/>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="expired_date" lg={3}>Expire Date</Label>
              <Col span={15}>
                <Input
                  type="date"
                  name="expired_date"
                  id="expired_date"
                  onChange={this.handleInputChange}
                  required
                />
              </Col>
            </FormGroup>
            <br/>
            <Row type="flex" justify="center">
              <Col span={7} style={{ margin: 5 }}>
                <Link to={"/applicants/" +  this.state.lamaran.id}> <Button className="btn-pill" outline color="danger" block>Cancel</Button> </Link>
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
    }

    let candidate = "Candidate " + this.state.lamaran.lowongan

    return (
      <div className="animated fadeIn">
        <div align="center">
          <h3>Remote Test</h3>
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

export default RemoteTest;
