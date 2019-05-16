// import React, { Component } from 'react';
// import axios from 'axios';
// import {
//   Button, Card, CardBody,
//   FormGroup, Input, Label, Col, Row
// } from 'reactstrap';
// import 'antd/dist/antd.css';
// import AddOnboardingTask from './AddOnboardingTask';
// import ModalDelete from './ModalDelete';
// import UpdateOnboardingTask from './UpdateOnboardingTask'

// import { MDBDataTable } from 'mdbreact';

// const API = 'http://localhost:8000';

// const data = {
//   columns: [
//     {
//       label: "Task's Name",
//       field: 'deskripsi',
//       sort: 'asc',
//       width: 300
//     },
//     {
//       label: "Status",
//       field: 'status',
//       sort: 'asc',
//       width: 200
//     },
//     {
//       label: "Assigned Date",
//       field: 'assigned_date',
//       sort: 'asc',
//       width: 300
//     },
//      {
//        label: "Action",
//        field: 'action',
//        width: 100
//      }

//   ],
//   rows: []
// }

// export class ListOnboardingTask extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       task_list: [],
//       loading: true,
//       id: '',
//       visible: false,
//     }
//   }

//   componentDidMount() {
//     axios.get(API + '/supervisor/getTugasOnboarding/3')
//       .then(res => {
//         const task = res.data;
//         this.setState({
//           task_list: task,
//           loading: false
//         })
//       })
//   }
//   render() {
//     let content;
//     let tugas;
//     let id_tugas;
//     console.log(this.state.task_list)
//     if (this.state.loading) {
//       content = <div align="center"><p>Loading . . .</p></div>;
//     } else {
//       let list_task = this.state.task_list.map((task, index) => {
//         tugas = task
//         id_tugas = task.id

//         return (
//           {
//             deskripsi: task.nama,
//             status: task.status,
//             assigned_date: task.assigned_date,
//             action:
//             <Row>
//            <UpdateOnboardingTask task={tugas}/>


//                   &nbsp;&nbsp;&nbsp; &nbsp;
//                   <ModalDelete id= {id_tugas} />


//             </Row>


//           }
//         );
//       });

//       data.rows = [];
//       for (var i = 0; i < list_task.length; i++) {
//         data.rows.push(list_task[i]);
//       }

//       content = (
//         <MDBDataTable borderless striped hover small btn data={data} />
//       );
//     }


//     return (
//       <div className="animated fadeIn">
//        <div align="center">
//           <h3>Task List</h3>
//         </div>
//         <br></br>


//          <Row>
//           <Col sm="2">
//           </Col>
//           <Col sm="8">
//           <AddOnboardingTask />
//           <br></br>
//             <Card >
//               <CardBody>
//              {content}
//             </CardBody>
//           </Card>
//           </Col>
//             <Col sm="2">
//           </Col>
//         </Row>
//       </div>
//     );
//   }
// }
// export default ListOnboardingTask;



//export default ListOnboardingTask;

import React from "react";
import axios from 'axios';

import "antd/dist/antd.css";

import { Table, Card, Popconfirm, Empty, Progress, Skeleton, Switch, Icon, Avatar } from "antd";
import { Component } from 'react';
import { ButtonGroup, Button, Row, Col } from 'reactstrap';
import ModalDelete from './ModalDelete';
import UpdateOnboardingTask from './UpdateOnboardingTask';
import AddOnboardingTask from './AddOnboardingTask';
import ModalChangeStatus from './ModalChangeStatus';

const API = 'http://localhost:8000';
const { Meta } = Card;

let tugas;

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
let progress;
let num_task = 0;
let task;

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
      progress:{approved:0, total:0}
    }
  }


  componentDidMount() {

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
        progress:progress
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
    const { loading, selectedRowKeys } = this.state;
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
                percent={Math.round(this.state.progress.approved / this.state.progress.total * 100)}
                status="active"
              />
            </Card>
            <AddOnboardingTask />
            <Card style={{ width: 830, marginTop: 16, marginBottom: 16 }} loading={this.state.loading}>
              <Row>
                <h4>My Task</h4>
              </Row>
              {/* <div>
                <div style={{ marginBottom: 16 }}>
                  <ButtonGroup>
                    <ModalChangeStatus selectedTasks={this.state.selectedRowKeys} items={this.state.selectedRowKeys.length} hasSelected={hasSelected} />
                  </ButtonGroup>
                  <br></br> <br></br>
                  <Button
                    type="primary"
                    onClick={this.start}
                    disabled={!hasSelected}
                  >
                    Reload
          </Button>

                  <span style={{ marginLeft: 8 }}>
                    {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
                  </span>



                </div> */}
                <Table
                  rowSelection={rowSelection}
                  columns={columns}
                  dataSource={data}
                  expandedRowRender={record => (
                    <p style={{ margin: 0 }}>{record.description}</p>
                  )}
                />
              
            </Card>
          </Col>
        </Row>
      </div>





    );
  }
}

export default ListOnboardingTask;
