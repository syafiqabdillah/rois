import React from 'react';
import 'antd/dist/antd.css';
import { Card, Col, Row, Avatar, Progress, List, Tooltip, Select } from 'antd';
import {Bar, Doughnut} from 'react-chartjs-2';
import axios from 'axios';
import ListOfTask from './ListOfTask';
import './CardStyle.css';

export default class EmployeePerformanceReport extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      options : {
        maintainAspectRatio: false,
        title: {
          display: true,
          text: 'Time to Complete Task',
          fontSize: 24,
        },
        scales: {
          xAxes: [
            {
              display : true,
              gridLines: {
                display: false,
              },
            },
          ],
          yAxes: [
            {
              type : 'linear',
              gridLines: {
                display: false,
              },
              ticks: {
                beginAtZero: true
              },
              labels: {
                show: true
              }
            },
          ],
        }
      },
      dataMapper : {},
      onBoarding : {},
      onBoardingInPercent : {},
      profile: {},
      avgTime: 0,
    }
  }

  componentDidMount() {
    this.getProfile();
    this.getAllTask();
    this.getOnboardingProgress();
  }

  getAllTask = () => {
    const label = []
    const time = []
    axios.get('http://localhost:8000' + '/po/get-all-task/' + this.props.employeeid)
      .then((response) => {
        const task = response.data;
        task.map((value) => {
          label.push(value['task_name'])
          time.push(value['days'])
        })

        this.setState({
            data: Object.assign({
              labels: label
            },
            {
              datasets: [
              {
                label: 'Time Spent (days)',
                backgroundColor: 'rgba(0, 137, 179,0.2)',
                borderColor: 'rgba(0, 137, 179,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(0, 137, 179,0.4)',
                hoverBorderColor: 'rgba(0, 137, 179,1)',
                data: time,
              }
            ]}
          ),
          dataMapper: task,
        });
        this.getAverageTimeCompleteTask();
      });
  }


  compareValuesAsc = (key='days', order='asc') => {
    return function(a, b){
      const varA = a[key];
      const varB = b[key];

      let compare = 0;
      if(varA > varB) {
        compare = 1;
      } else if (varA < varB) {
        compare = -1;
      }
      return compare;
    }
  }

  compareValuesDesc = (key='days', order='desc') => {
    return function(a, b){
      const varA = a[key];
      const varB = b[key];

      let compare = 0;
      if(varA > varB) {
        compare = -1;
      } else if (varA < varB) {
        compare = 1;
      }
      return compare;
    }
  }

  getOnboardingProgress = () => {
    axios.get('http://localhost:8000' + '/po/get-onboarding-progress/' + this.props.employeeid)
      .then((response) => {
        const onboarding = response.data;
        this.setState({
            onBoarding: onboarding
        });
        this.getOnboardingProgressInPercent();
    });
  }

  getProfile = () => {
    axios.get('http://localhost:8000' + '/po/get-employee-profile/' + this.props.employeeid)
      .then((response) => {
        const profile = response.data[0];
        this.setState({
            profile: profile
        });
    });
  }

  getAverageTimeCompleteTask = () => {
    let arr = this.state.data.datasets[0].data;
    const arrAvg = arr.reduce((a,b) => a + b, 0) / arr.length;
    this.setState({
      avgTime: arrAvg
    })

  }

  getOnboardingProgressInPercent= () => {
    const successPercent = this.state.onBoarding['complete']/this.state.onBoarding['total'];
    const percent = (this.state.onBoarding['complete']+this.state.onBoarding['onprogress'])/this.state.onBoarding['total'];
    this.setState({
        onBoardingInPercent: Object.assign({successPercent: Math.round(successPercent*100)},{percent: Math.round(percent*100)})
    });
  }

  handleChange = (value) =>{
    const newLabel = [];
    const newNumber = [];
    const datasetsCopy = this.state.data.datasets.slice(0);
    let sortData = []

    if(value === 'asc'){
      sortData = this.state.dataMapper.sort(this.compareValuesAsc());
    } else{
      sortData = this.state.dataMapper.sort(this.compareValuesDesc());
    }

    sortData.map((value) => {
      newLabel.push(value['task_name'])
      newNumber.push(value['days'])
    })

    datasetsCopy[0].data = newNumber;

    this.setState({
        data: Object.assign({}, this.state.data, {labels: newLabel}, {
            datasets: datasetsCopy
        })
    });
  }


  render() {
    const Option = Select.Option;
    let tasksummary = this.state.onBoarding['complete'] + ' done / ' +this.state.onBoarding['onprogress'] + ' in progress / ' + this.state.onBoarding['assigned']+' to do';
    return (
        <div style={{ padding: '30px' }}>
          <Row gutter={16}>
            <Col span={10}>
              <Card bordered={false} className='card-component'>
                <Row style={{ marginBottom: 5 }}>
                </Row>
                <Row>
                  <Col span={8} style={{ marginRight: 5 }}>
                    <Avatar style={{ backgroundColor: '#87d068' }} icon="user" size={120}/>
                  </Col>
                  <Col span={13}>
                    <Row justify='center'><h2><strong>{this.state.profile.name}</strong></h2></Row>
                    <Row><h4 style={{ color: '#59A3FC' }}><strong>{this.state.profile.position}</strong></h4></Row>
                    <Row><h5>{this.state.profile.division}</h5></Row>
                  </Col>
                </Row>

              </Card>
            </Col>
            <Col span={7}>
              <Card bordered={false} className='card-component'>
                <Row style={{ marginBottom: 20 }}>
                  <h6 align='center'><strong>Average Time to Complete Task</strong></h6>
                </Row>
                <Row>
                  <p style={{ fontSize : 33 }} align='center'>{this.state.avgTime} days / task</p>
                </Row>
              </Card>
            </Col>
            <Col span={7}>
              <Card bordered={false} className='card-component'>
                <Row style={{ marginBottom: 7 }}>
                  <h6 align='center'><strong>Onboarding Progress</strong></h6>
                </Row>
                <Row>
                  <div align='center'>
                    <Tooltip title={tasksummary}>
                      <Progress percent={this.state.onBoardingInPercent['percent']} strokeLinecap='square' successPercent={this.state.onBoardingInPercent['successPercent']} type="circle" width={95}/>
                    </Tooltip>
                  </div>
                </Row>
              </Card>
            </Col>
          </Row>
          <br/>
          <Row>
            <Card bordered={false} className='card-component'>
              <Row>
                <Select defaultValue="Sort by" style={{ width: 120 }} onChange={this.handleChange}>
                  <Option value="asc">Ascending</Option>
                  <Option value="desc">Descending</Option>
                </Select>
              </Row>
              <Row>
                <Bar
                  data={this.state.data}
                  width={100}
                  height={250}
                  options={this.state.options}
                />
              </Row>
            </Card>
          </Row>
          <br/>
          <Row gutter={16}>
            <Col span={8}>
            <Card bordered={false} className='card-component'>
              <Row style={{ marginBottom: 7 }}>
                <h4 align='center'><strong>Assigned</strong></h4>
              </Row>
              <Row>
                <ListOfTask status='assigned'employeeid={this.props.employeeid}/>
              </Row>
            </Card>
            </Col>
            <Col span={8}>
              <Card bordered={false} className='card-component'>
                <Row style={{ marginBottom: 7 }}>
                  <h4 align='center'><strong>On Progress</strong></h4>
                </Row>
                <Row>
                  <ListOfTask status='onprogress' employeeid={this.props.employeeid}/>
                </Row>
              </Card>
            </Col>
            <Col span={8}>
              <Card bordered={false} className='card-component'>
                <Row style={{ marginBottom: 7 }}>
                  <h4 align='center'><strong>Completed</strong></h4>
                </Row>
                <Row>
                  <ListOfTask status='complete' employeeid={this.props.employeeid}/>
                </Row>
              </Card>
            </Col>
          </Row>
        </div>
    );
  }
}
