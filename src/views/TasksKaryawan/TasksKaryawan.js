import React, { Component } from 'react';
import axios from 'axios';
import 'antd/dist/antd.css';
import moment from 'moment';
import { message, Modal, Progress, Table, Card, Avatar, Row, Col } from 'antd';

const API = 'http://localhost:8000';

const { Meta } = Card;

let columns = [
  { title: 'Task', dataIndex: 'nama', key: 'nama' },
  { title: 'Status', dataIndex: 'status', key: 'status' },
];

let data = [];

class TasksKaryawan extends Component {
  constructor(props) {
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
      chosenTaskStatus: 0,
      progress: { taskdone: 0, total: 0 }
    }
  }

  componentDidMount() {
    axios.get(API + '/ko/karyawan-onboarding/' + this.props.match.params.id)
      .then(res => {
        const karyawanOnboarding = res.data;
        //console.log(karyawanOnboarding);
        this.setState({
          karyawan_onboarding: karyawanOnboarding,
        })
      })

    axios.get(API + '/ko/tasks-karyawan/' + this.props.match.params.id)
      .then(res => {
        const tasks = res.data;
        //console.log(tasks);
        this.setState({
          tasks: tasks,
          loading: false
        })
      })

    axios.get(API + '/po/get-onboarding-progress/' + this.props.match.params.id)
      .then(res => {
        const progress = res.data;
        console.log('progress')
        console.log(progress);
        this.setState({
          progress: progress
        })
      })
  }

  showModal(task) {
    if (task.status === 'Assigned') {
      this.setState({
        modalTitle: 'Start the Task',
        modalText: 'Are you sure you want to start the progress of this task?',
        visible: true,
        chosenTaskId: task.id,
        chosenTaskStatus: task.status
      });
    } else if (task.status === 'On Progress') {
      this.setState({
        modalTitle: 'Request for Approval',
        modalText: 'Are you sure you want to confirm your changes on this finished task and request for approval to your supervisor?',
        visible: true,
        chosenTaskId: task.id,
        chosenTaskStatus: task.status
      });
    }
  };

  handleOk = () => {
    // axios post
    let qs = require('qs');

    if (this.state.chosenTaskStatus === 'Assigned') {
      //post it to backend
      axios.post('http://localhost:8000/ko/update-task-karyawan/', qs.stringify({
        'id': this.state.chosenTaskId,
        'status': 'On Progress',
        'start_date': moment(new Date()).format('YYYY-MM-DD'),
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
      .then(() => message.success('Success! you are now progressing on this task', 3))
      .then(() => window.location.reload())

    } else if (this.state.chosenTaskStatus === 'On Progress') {
      //post it to backend
      axios.post('http://localhost:8000/ko/update-task-karyawan/', qs.stringify({
        'id': this.state.chosenTaskId,
        'status': 'Finished',
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
      .then(() => message.success('Success! Changes saved, we have send a notification to your supervisor about this progress', 3))
      .then(() => window.location.reload())

    }
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    let { visible, confirmLoading } = this.state;

    let content;
    let progress;

    let tasks_list = this.state.tasks.map((task, index) => {
      return (
        {
          key: index,
          id: task.id,
          nama: task.nama,
          deadline: task.deadline_date,
          status: task.status,
          description: task.deskripsi
        }
      );
    });

    let finished = 0;

    data = [];

    for (var i = 0; i < tasks_list.length; i++) {
      data.push(tasks_list[i]);
      if (tasks_list[i].status === 'Finished') {
        finished = finished + 1;
      }
    }

    progress = Math.round(this.state.progress.taskdone / this.state.progress.total * 100);

    return (
      <div className="animated fadeIn">
        <div align="center">
          <h3>Tasks List</h3>
        </div>
        <Row type="flex" justify="center">
          <Col>
            <Card hoverable style={{ width: 830, marginTop: 16, marginBottom: 16 }} loading={this.state.loading}>
              <Meta style={{ marginBottom: 16 }}
                avatar={<Avatar size="large" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title={this.state.karyawan_onboarding.name}
                description={this.state.karyawan_onboarding.divisi}
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
            <Card hoverable style={{ width: 830, marginTop: 16, marginBottom: 32 }} loading={this.state.loading}>
              <h4>My Tasks</h4>
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
        </Row>
      </div>
    );
  }
}

export default TasksKaryawan;
