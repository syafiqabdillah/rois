import React from "react";
import axios from 'axios';

import "antd/dist/antd.css";

import { Table, Card, Progress, Avatar } from "antd";
import { Component } from 'react';
import { ButtonGroup, Button, Row, Col } from 'reactstrap';
import ModalDelete from './ModalDelete';
import UpdateOnboardingTask from './UpdateOnboardingTask';
import AddOnboardingTask from './AddOnboardingTask';
import ModalChangeStatus from './ModalChangeStatus';

const API = 'http://localhost:8000';
const { Meta } = Card;

const columns = [
  {
    title: "Name",
    dataIndex: "nama"
  },
  {
    title: "Status",
    dataIndex: "status"
  },
  {
    title: "Assigned Date",
    dataIndex: "assigned_date"
  },
  {
    title: "Action",
    dataIndex: "",
    key: "x",

    render: (record) => (
      <Row>
        <UpdateOnboardingTask task={record} />



        &nbsp;&nbsp;&nbsp; &nbsp;
                  <ModalDelete id={record.key} />

      </Row>


    )
  },
];

const data = [];
let finished = 0;
let num_task = 0;

export class ListOnboardingTask extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      task_list: [],
      loading_page: true,
      id: '',
      visible: false,
      karyawan_onboarding: '',
      progress: { taskdone: 0, total: 0 }
    }
  }


  componentDidMount() {
    localStorage.setItem('id_karyawan_onboarding', this.props.match.params.id)

    axios.get(API + '/supervisor/getNamaKaryawanOnboarding/' + this.props.match.params.id)
      .then(res => {
        // console.log('nama onboarding ')
        // console.log(res.data)
        this.setState({ karyawan_onboarding: res.data.name })
      })

    axios.get(API + '/supervisor/getTugasOnboarding/' + this.props.match.params.id)
      .then(res => {
        console.log(res.data)
        const task = res.data;
        task.map((task, index) => {
          num_task = num_task + 1;
          data.push({
            key: task.id,
            nama: task.nama,
            status: task.status,
            assigned_date: task.assigned_date,
            description: task.deskripsi,
            flag: task.flag
          })
          if (task.status === 'Approved') {
            finished = finished + 1;
          }

          this.setState({
            loading_page: false
          })
        })
      })

    finished = 0;
    num_task = 0;

    axios.get(API + '/po/get-onboarding-progress/' + this.props.match.params.id)
      .then(res => {
        const progress = res.data;
        //console.log(progress);
        this.setState({
          progress: progress
        })
      })
  };

  start = () => {
    this.setState({ loading: true });
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false
      });
    }, 1000);
  };

  onSelectChange = (selectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      getCheckboxProps: record => ({
        disabled: record.flag === 0, // Column configuration not to be checked
      }),
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (

      <div className="animated fadeIn">
        <div align="center">
          <h3>Task List</h3>
        </div>

        <Row>
          <Col lg={2}>
          </Col>
          <Col lg={8}>
            <Card style={{ width: 830, marginTop: 16, marginBottom: 32 }} loading={this.state.loading}>
              <Meta style={{ marginBottom: 16 }}
                avatar={<Avatar size="large" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title={this.state.karyawan_onboarding}
                description="Full Stack Engineer Intern"
              />
              <h6>Onboarding Progress</h6>
              <Progress
                strokeColor={{
                  from: '#108ee9',
                  to: '#59A3FC',
                }}
                percent={Math.round(this.state.progress.taskdone / this.state.progress.total * 100)}
                status="active"
              />
            </Card>
            <AddOnboardingTask />
            <Card style={{ width: 830, marginTop: 16, marginBottom: 16 }} loading={this.state.loading}>
              <Row>
                <h4>{this.state.karyawan_onboarding}'s Task</h4>
              </Row>
              <div>
                <div style={{ marginBottom: 16 }}>
                  <ButtonGroup>
                    <ModalChangeStatus selectedTasks={this.state.selectedRowKeys} items={this.state.selectedRowKeys.length} hasSelected={hasSelected} />
                  </ButtonGroup>
                  <br></br>

                  <span style={{ marginLeft: 8 }}>
                    {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
                  </span>
                </div>
                <Table
                  rowSelection={rowSelection}
                  columns={columns}
                  dataSource={data}
                  expandedRowRender={record => (
                    <p style={{ margin: 0 }}>{record.description}</p>
                  )}
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ListOnboardingTask;
