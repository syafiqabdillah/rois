import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Input,
  Row,
  Badge
} from 'reactstrap';

import 'antd/dist/antd.css';
import { Icon } from 'antd';
import axios from 'axios';
import CountDown from './CountDown';
import { Form } from 'antd';
import  AnswerForm from './AnswerForm';
import ConfirmationStartTest from './ConfirmationStartTest';


class AddAnswer extends React.Component{
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      modals : false,
      loading : true,
      startDateAnswer : null,
      endDateAnswer : '',
      namaPelamar : '',
      lowonganDidaftar : '',
      link : '',
    };
  }

  showModals = () =>{
    this.setState({
      modals : true
    })
  }

  componentDidMount(){
    this.getDetailRemoteTest();
  }

  getDetailRemoteTest = () =>{
    axios.get('http://localhost:8000' + '/po/remote-test/' + this.props.match.params.id)
      .then((response) => {
        console.log(response);
        let startDate = response.data.start_date;
        if(response.data.start_date){
            startDate = new Date(response.data.start_date).toISOString();
        }
        console.log(response.data.start_date);
        const duration = response.data.duration;
        const endDate = this.getEndTime(startDate, duration)
        const idLamaran = response.data.id_lamaran;
        const answerLink = response.data.link_jawaban;
        this.setState({
          startDateAnswer : startDate,
          endDateAnswer : endDate,
          link : answerLink
        });
        this.getDetailLamaran(idLamaran);
      });
  }

  getDetailLamaran = (idLamaran) => {
    axios.get('http://localhost:8000' + '/po/lamaran/' + idLamaran)
      .then((response) => {
        const idLowongan = response.data.id_lowongan;
        const tokenPelamar = response.data.token_pelamar;
        this.getDetailApplicant(idLowongan, tokenPelamar);
      });
  }

  getDetailApplicant = (idLowongan, tokenPelamar) => {
    axios.all([
      axios.get('http://localhost:8000' + '/po/lowongan/' + idLowongan),
      axios.get('http://localhost:8000' + '/pelamar/get-profile/' + tokenPelamar)
    ])
      .then(axios.spread((lowongan, pelamar) => {
        // do something with both responses
        const namaLowongan = lowongan.data.nama;
        const namaPelamar = pelamar.data[0].nama;
        console.log(pelamar);
        this.setState({
          lowonganDidaftar : namaLowongan,
          namaPelamar : namaPelamar,
          loading: false
        });
      }));
  }

  getEndTime = (startTime, duration) => {
    const starttime = new Date(startTime);
    console.log(starttime);
    const end = new Date(starttime.getTime() + duration * 24 * 60 * 60 * 1000);
    console.log(end)
    return end.toISOString().split('.')[0];
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState }});
  }


  render() {
    const textStyle = {
      color : "#979797",
    };
    const FormAnswer = Form.create({ name: 'answer' })(AnswerForm);
    let body = null;
    let startTest =
      <div>
        <Row>
          <Col xs="12" align="center">
            <h4>Congratulation, you have on remote test phase</h4>
            <p>To get coding task click button below</p>
          </Col>
        </Row>
        <Row>
          <Col sm="2" md={{ size: 5, offset: 5 }}>
            <ConfirmationStartTest idRemoteTest= {this.props.match.params.id}/>
          </Col>
        </Row>

      </div>;
    let answer =
      <div>
        <Row>
          <Col xs="12" align="center">
            <CountDown endDate={`${this.state.endDateAnswer}`}/>
            <p style={textStyle}> Submission format : https://github.com/johndoe/submission.git </p>
          </Col>
        </Row>
        <Row>
          <Col xs="12">
            <FormAnswer />
          </Col>
        </Row>
      </div>;
    let success =
    <div>
    <Row>
      <Col sm="2" md={{ size: 7, offset: 5 }}>
        <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" style={{ fontSize: '64px'}}/>
        <br/>
      </Col>
    </Row>
      <Row>
        <Col sm="2" md={{ size: 8, offset: 3 }}>
          <br/>
          <h4>You have submit remote test answer</h4>
        </Col>
      </Row>
    </div>;
    if(this.state.startDateAnswer){
      console.log(Boolean(this.state.startDateAnswer))
      const value = this.state.link;
      if(value){
        body = success;
      } else{
        body = answer;
      }
    } else{
      body = startTest;
    }
    return (
      <div className="animated fadeIn">
          <Row>
            <Col sm="2" md={{ size: 4, offset: 5 }}>
              <h3><strong>Remote Test Assesment</strong></h3>
            </Col>
          </Row>
          <Row>
          <Col sm="10" md={{ size: 7, offset: 3 }}>
            <Card>
              <CardHeader>
                {/*<strong>Submission</strong>*/}
                <div>
                  <i className="fa fa-user pr-1"></i>
                  <Badge color="light">{this.state.namaPelamar}</Badge>
                  <Badge color="secondary">{this.state.lowonganDidaftar}</Badge>
                </div>
              </CardHeader>
              <CardBody>
                <div>{body}</div>
              </CardBody>
            </Card>
          </Col>
          </Row>
      </div>
      );
    }
}

export default AddAnswer;
