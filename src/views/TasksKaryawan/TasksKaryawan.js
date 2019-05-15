import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table, CardTitle, CardText, Progress, Tooltip, Button } from 'reactstrap';
import { MDBDataTable } from 'mdbreact';

const API = 'http://localhost:8000';

const data = {
  columns: [
    {
      label: 'Task',
      field: 'deskripsi',
      sort: 'asc',
      width: 200
    },
    {
      label: 'Deadline',
      field: 'deadline_date',
      sort: 'asc',
      width: 200
    },
    {
      label: 'Status',
      field: 'status',
      sort: 'asc',
      width: 200
    },
  ],
  rows: []
};

class TasksKaryawan extends Component {
  constructor(props){
    super(props);

    this.state = {
      tasks: [],
      karyawan_onboarding: [],
      loading: true,
    }

  }

  componentDidMount(){
    axios.get(API + '/ko/karyawan-onboarding/' + this.props.match.params.username)
    .then(res => {
      const karyawanOnboarding = res.data;
      console.log(karyawanOnboarding);
      this.setState({
        karyawan_onboarding: karyawanOnboarding,
      })
    })

    axios.get(API + '/ko/tasks-karyawan/' + this.props.match.params.username)
    .then(res => {
      const tasks = res.data;
      console.log(tasks);
      this.setState({
        tasks: tasks,
        loading: false
      })
    })
  }

  handleRowClick(task) {
    if (task.status == 'On Progress') {
      if (window.confirm('Confirm changes on finished task?')) {
        console.log(task);

        // axios post
        var qs = require('qs');

        //post it to backend
        axios.post('http://localhost:8000/ko/update-task-karyawan/', qs.stringify({
          'id': task.id,
          'status': 'Waiting For Confirmation',
        }),
        {
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
        .then(function (response) {
            console.log(response.data);
        })

        window.location.reload();
        window.alert('Success! Changes saved, we have notified your supervisor about this progress');
      }
    }
  };

  render() {
    let content;
    let progress;

    if (this.state.loading){
      content = <div align="center"><p>Loading . . .</p></div>;
    } else {
      let tasks_list = this.state.tasks.map((task, index) => {
        return (
          {
            deskripsi: task.deskripsi,
            deadline: task.deadline_date,
            status: task.status,
            clickEvent: () => this.handleRowClick(task),
          }
        );
      });

      data.rows = [];

      let finished = 0;

      for (var i = 0; i < tasks_list.length; i++) {
        data.rows.push(tasks_list[i]);
        if (tasks_list[i].status == 'Finished'){
          finished = finished + 1;
        }
      }

      progress = Math.round(finished / tasks_list.length * 100);

      content = (
        <MDBDataTable borderless striped hover small btn data={data} />
      );
    }

    return (
      <div className="animated fadeIn">
        <div align="center">
          <h3>Applicant's Profile</h3>
        </div>
        <br/>
        <Row>
          <Col lg={2}>
          </Col>
          <Col lg={8}>
            <Card >
              <CardHeader>
                <i className="fa fa-user pr-1"></i> {this.state.karyawan_onboarding.name}
              </CardHeader>
              <CardBody>
                <h4 align='center'>Onboarding Progress: <Badge color="secondary">{progress}%</Badge></h4>
                <hr />
                <h6>My Tasks</h6>
                <Row>
                  <Col lg={12}>
                    <Card body>
                      {content}
                    </Card>
                  </Col>
                </Row>
              </CardBody>
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
