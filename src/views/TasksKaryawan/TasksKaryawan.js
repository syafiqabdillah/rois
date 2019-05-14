import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Col, Row } from 'reactstrap';
import 'antd/dist/antd.css';
import { Badge, Modal, Popconfirm, Empty, Progress, Table, Skeleton, Switch, Card, Icon, Avatar } from 'antd';

const API = 'http://localhost:8000';

const { Meta } = Card;

let columns = [
  { title: 'Task', dataIndex: 'nama', key: 'nama' },
  { title: 'Deadline', dataIndex: 'deadline', key: 'deadline' },
  { title: 'Status', dataIndex: 'status', key: 'status'},
];

let data = [];

class TasksKaryawan extends Component {
  constructor(props){
    super(props);
    this.state = {
      tasks: [],
      karyawan_onboarding: [],
      loading: true,
      visible: false,
      confirmLoading: false,
      modalTitle: '',
      modalText: '',
      chosenTaskId: 0,
      chosenTaskStatus: 0
    }
  }

  componentDidMount(){
    axios.get(API + '/ko/karyawan-onboarding/' + this.props.match.params.id)
    .then(res => {
      const karyawanOnboarding = res.data;
      console.log(karyawanOnboarding);
      this.setState({
        karyawan_onboarding: karyawanOnboarding,
      })
    })

    axios.get(API + '/ko/tasks-karyawan/' + this.props.match.params.id)
    .then(res => {
      const tasks = res.data;
      console.log(tasks);
      this.setState({
        tasks: tasks,
        loading: false
      })
    })
  }

  showModal(task) {
    if (task.status == 'Assigned') {
      this.setState({
        modalTitle: 'Starting the Task',
        modalText: 'Are you sure you want to start the progress of the task?',
        visible: true,
        chosenTaskId: task.id,
        chosenTaskStatus: task.status
      });
    } else if (task.status == 'On Progress') {
      this.setState({
        modalTitle: 'Requesting for Approval',
        modalText: 'Are you sure you want to confirm your changes on the finished task?',
        visible: true,
        chosenTaskId: task.id,
        chosenTaskStatus: task.status
      });
    }
  };

  handleOk = () => {
    if (this.state.chosenTaskStatus == 'Assigned') {
      // axios post
      let qs = require('qs');
      //post it to backend
      axios.post('http://localhost:8000/ko/update-task-karyawan/', qs.stringify({
          'id': this.state.chosenTaskId,
          'status': 'On Progress',
        }), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then(function(response) {
          console.log(response.data);
        })
      this.setState({
        modalText: 'Success! you are now progressing on this task',
        confirmLoading: true,
      });
      setTimeout(() => {
        this.setState({
          visible: false,
          confirmLoading: false,
        });
      }, 2000);

      window.location.reload();

    } else if (this.state.chosenTaskStatus == 'On Progress') {
        // axios post
        let qs = require('qs');
        //post it to backend
        axios.post('http://localhost:8000/ko/update-task-karyawan/', qs.stringify({
            'id': this.state.chosenTaskId,
            'status': 'Waiting For Confirmation',
          }), {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
          .then(function(response) {
            console.log(response.data);
          })
        this.setState({
          modalText: 'Success! Changes saved, we have notified your supervisor about this progress',
          confirmLoading: true,
        });
        setTimeout(() => {
          this.setState({
            visible: false,
            confirmLoading: false,
          });
        }, 0);
        window.location.reload();
    };
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    let { visible, confirmLoading, modalText, modalTitle } = this.state;

    let content;
    let progress;

    if (this.state.loading){
      content = <div align="center"><p>Loading . . .</p></div>;
    } else {
      let tasks_list = this.state.tasks.map((task, index) => {
        return (
          {
            key: index,
            id: task.id,
            nama: task.nama,
            deadline: task.deadline_date,
            status: task.status,
            description:task.deskripsi
          }
        );
      });

      let finished = 0;

      data = [];

      for (var i = 0; i < tasks_list.length; i++) {
        data.push(tasks_list[i]);
        if (tasks_list[i].status == 'Finished'){
          finished = finished + 1;
        }
      }

      progress = Math.round(finished / tasks_list.length * 100);

    }

    return (
      <div className="animated fadeIn">
        <div align="center">
          <h3>Tasks List</h3>
        </div>
        <br/>
        <Row>
          <Col lg={2}>
          </Col>
          <Col lg={8}>
            <Card style={{ width: 830, marginTop: 16, marginBottom: 32 }} loading={this.state.loading}>
              <Meta style={{ marginBottom: 16}}
                avatar={ <Avatar size="large" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /> }
                title={this.state.karyawan_onboarding.name}
                description="Full Stack Engineer Intern"
              />
              <h6>My Onboarding Progress</h6>
              <Progress
                strokeColor={{
                  from: '#108ee9',
                  to: '#59A3FC',
                }}
                percent={progress}
                status="active"
              />
            </Card>
            <Card style={{ width: 830, marginTop: 16, marginBottom: 16 }} loading={this.state.loading}>
              <h4>My Task</h4>
              <Table
                columns={columns}
                expandedRowRender={record => <p style={{ margin: 0 }}>{record.description}</p>}
                dataSource={data}
                size="middle"
                onRow={(record, rowIndex) => {
                  return {
                    onClick: () => this.showModal(record)
                  };
                }}
              />
              <Modal
                title={this.state.modalTitle}
                visible={visible}
                onOk={this.handleOk}
                confirmLoading={confirmLoading}
                onCancel={this.handleCancel}
              >
                <p>{this.state.modalText}</p>
              </Modal>
            </Card>
          </Col>
          <Col lg={2}>
          </Col>
        </Row>
      </div>
    );
  }
}

export default TasksKaryawan;
