import React from 'react';
import { Redirect } from 'react-router-dom';
import {
  Card,
  CardBody,
  CardHeader,
  Badge
} from 'reactstrap';

import 'antd/dist/antd.css';
import { Icon, Row, Col, Form } from 'antd';
import axios from 'axios';
import moment from 'moment';
import CountDown from './CountDown';
import  AnswerForm from './AnswerForm';
import ConfirmationStartTest from './ConfirmationStartTest';


export default class AddAnswer extends React.Component{
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
      expiredDate : '',
      namaPelamar : '',
      lowonganDidaftar : '',
      soalLink : '',
      answerLink : '',
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
        let startDate = response.data.start_date;

        if(response.data.start_date){
            startDate = new Date(response.data.start_date).toISOString();
        }

        const duration = response.data.duration;
        const idLamaran = response.data.id_lamaran;
        const idSoal = response.data.id_soal;
        const answerLink = response.data.link_jawaban;
        const expiredDate = response.data.expired_date;
        const endDate = this.getEndTime(startDate, duration);
        console.log(endDate);

        this.setState({
          startDateAnswer : startDate,
          endDateAnswer : endDate,
          answerLink : answerLink,
          expiredDate : expiredDate,
        });

        this.getDetailApplicant(idLamaran);
        this.getLinkSoal(idSoal);
      });
  }

  getDetailApplicant = (idLamaran) => {
    axios.get('http://localhost:8000' + '/po/get-detail-applicant/' + idLamaran)
      .then((response) => {
        const namaLowongan = response.data.lowongan;
        const namaPelamar = response.data.nama_pelamar;
        this.setState({
          lowonganDidaftar : namaLowongan,
          namaPelamar : namaPelamar,
          loading: false
        });
      });
  }

  getLinkSoal = (idSoal) => {
    axios.get('http://localhost:8000' + '/po/soal/' + idSoal)
      .then((response) => {
        const linkSoal = response.data.link;
        this.setState({
          soalLink : linkSoal,
        })
      });
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

    if (localStorage.getItem('role') != 'pelamar') {
      return <Redirect to="/vacancies-pelamar" />
    }

    const FormAnswer = Form.create({ name: 'answer' })(AnswerForm);
    let body = null;
    let startTest =
      <div>
        <Row>
          <Col align="center">
            <h4>Congratulation</h4>
            <h4>You have on remote test phase</h4>
            <p>Click button below to start coding test</p>
          </Col>
        </Row>
        <Row>
          <Col span={5} offset={10}>
            <ConfirmationStartTest idRemoteTest= {this.props.match.params.id}/>
          </Col>
        </Row>

      </div>;

      let expired =
        <div>
          <Row>
            <Col align="center">
              <Icon type="eye-invisible" style={{ fontSize: '64px'}}/>
              <p>Remote Test have been expired</p>
            </Col>
          </Row>
        </div>;

    let answer =
      <div>
        <Row>
          <Col align="center">
            <CountDown endDate={`${this.state.endDateAnswer}`}/>
            <p style={textStyle}> Submission format : https://github.com/johndoe/submission.git </p>
            <Icon type="code" />
            <a href={this.state.soalLink}>Coding Task</a>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormAnswer idRemoteTest={this.props.match.params.id} />
          </Col>
        </Row>
      </div>;

    let success =
    <div>
    <Row>
      <Col span={12} offset={10}>
        <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" style={{ fontSize: '64px'}}/>
        <br/>
      </Col>
    </Row>
      <Row>
        <Col span={12} offset={7}>
          <br/>
          <h5>You have submit remote test answer</h5>
          <h5>We will inform you under one week</h5>
        </Col>
      </Row>
    </div>;

    //conditional rendering
    var today = moment(new Date()).format('YYYY-MM-DD');
    var expiredDate = moment(this.state.expiredDate).format('YYYY-MM-DD');
    var endDateForSubmit = moment(this.state.endDateAnswer).format('YYYY-MM-DD');
    console.log("today: ",today,"expired: ", expiredDate, "endDate: ",endDateForSubmit);

    if(this.state.startDateAnswer){
      console.log(moment(today).isBefore(endDateForSubmit));
      if(this.state.answerLink){
        body = success;
      } else if(!this.state.answerLink && moment(today).isBefore(endDateForSubmit)){
        console.log("masuk");
        body = answer;
      } else if(!this.state.answerLink && moment(today).isAfter(endDateForSubmit)){
        body = expired;
      }
    } else { //aplicant not start test
      if(moment(today).isBefore(expiredDate)){
        body = startTest;
      } else if(moment(today).isAfter(expiredDate)){
        body = expired;
      }
    }

    return (
      <div className="animated fadeIn">
          <Row>
            <Col align="center">
              <h3><strong>Remote Test</strong></h3>
            </Col>
          </Row>
          <Row>
          <Col span={12} offset={6}>
            <Card>
              <CardHeader>
                <div>
                  <i className="fa fa-user pr-1"></i>
                  <Badge color="light">{this.state.namaPelamar}</Badge>
                  <Badge color="secondary">Candidate {this.state.lowonganDidaftar}</Badge>
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
