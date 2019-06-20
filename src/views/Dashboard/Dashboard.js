import React, { Component } from 'react';
import { Redirect} from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';
import { Card, CardBody, CardHeader, Col, Row, Spinner, Form,FormGroup, Label, Input, Button } from 'reactstrap';
import axios from 'axios';
import {Doughnut} from 'react-chartjs-2';
import 'antd/dist/antd.css';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:null,
      start:null,
      end:null,
      divisi:null,
      loading: true
    }
  }

  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/30763kr7/';

  componentDidMount(){
    var today = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()+1
    );
    var sixmonthago = new Date(
      new Date().getFullYear(),
      new Date().getMonth()-6,
      new Date().getDate()
    );

    today = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    sixmonthago = sixmonthago.getFullYear()+'-'+(sixmonthago.getMonth()+1)+'-'+sixmonthago.getDate();
    localStorage.setItem('start', sixmonthago)
    localStorage.setItem('end', today)

    axios.get('http://localhost:8000/po/recruitment-report/All/' + sixmonthago + '/' + today)
    .then(res => {
      const data = res.data;
      this.setState({
        data:data,
        start:sixmonthago,
        end:today,
        divisi:"All",
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

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({loading:true})
    axios.get('http://localhost:8000/po/recruitment-report/' + this.state.divisi + '/' + this.state.start + '/' + this.state.end)
    .then(res => {
      const data = res.data;
      console.log(data);
      this.setState({
        data:data,
        loading: false
      })
      console.log(this.state)
    })
  }

  render() {
    if (localStorage.getItem('role') !== 'ADMIN') {
      return <Redirect to="/vacancies-applicant" />
    }
    let content;
    let endfield;
    if (this.state.start == null){
      endfield = (<FormGroup>
        <Label for="end">End Date</Label>
        <Input type="date" id="end" name="end" onChange={this.handleInputChange} value={this.state.end} min={this.state.start}required disabled/>
      </FormGroup>)
    } else {
      endfield = (<FormGroup>
        <Label for="end">End Date</Label>
        <Input type="date" id="end" name="end" onChange={this.handleInputChange} value={this.state.end} min={this.state.start}required/>
      </FormGroup>)
    }

    let form = (
      <Form onSubmit={this.handleSubmit}>
        <Row form>
        <Col md={4}>
          <FormGroup>
            <Label for="start">Start Date</Label>
            <Input type="date" id="start" name="start" onChange={this.handleInputChange} required/>
          </FormGroup>
        </Col>
        <Col md={4}>
          {endfield}
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="exampleZip">Division</Label>
            <Input type="select" id="divisi" name="divisi" onChange={this.handleInputChange} defaultValue="All" required>
              <option value="All">All</option>
              <option value="Managerial">Managerial</option>
              <option value="Technology">Technology</option>
              <option value="Sales">Sales</option>
              <option value="Marketing">Marketing</option>
              <option value="Support">Support</option>
              <option value="Commerce">Commerce</option>
              <option value="Finance and People Operation">Finance and People Operation</option>
              <option value="Other">Other</option>
            </Input>
          </FormGroup>
        </Col>
      </Row>
      <Button color="primary" size="lg" block>ANALYZE</Button>
      <br/>
      </Form>);

    if (this.state.loading){
      content = (
        <div>
          {form}
          <div align="center"><Spinner color="primary" style={{ width: '3rem', height: '3rem' }} /></div>
        </div>
      );
    } else {
      let data = this.state.data;
      if(this.state.divisi === "All"){
        content = (
          <div align="left">
            {form}
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Recruitment Summary | {this.state.divisi} | {this.state.start} to {this.state.end}
              </CardHeader>
              <CardBody>
                <div align="center" height={1000}>
                  <BarChart
                    layout="vertical"
                    width={1000}
                    height={300}
                    data={data}
                    margin={{
                      top: 5, right: 30, left: 20, bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number"/>
                    <YAxis dataKey="name" type="category"/>
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Administration" fill="#E1341E" />
                    <Bar dataKey="Remote Test" fill="#24DB7E" />
                    <Bar dataKey="Interview" fill="#DB2481" />
                    <Bar dataKey="Hired" fill="#1ECBE1" />
                  </BarChart>
                </div>
              </CardBody>
            </Card>
          </div>
        );
      }else{
        const data = this.state.data;

        content = (
          <div align="left">
            {form}
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Recruitment Summary | {this.state.divisi} | {this.state.start} to {this.state.end}
              </CardHeader>
              <CardBody>
                <div align="center">
                  <Doughnut data={data} />
                </div>
              </CardBody>
            </Card>
          </div>
        );
      }


    }

    return (
      <div className="animated fadeIn">
        <div align="center">
          <h3>Recruitment Summary</h3>
        </div>
        <br />
        <Row>
          <Col lg={12}>
            {content}
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
