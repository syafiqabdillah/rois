import React, { Component } from 'react';
import axios from 'axios';
import {
  Button, Card, CardBody,
  FormGroup, Input, Label, Col, Row
} from 'reactstrap';
import 'antd/dist/antd.css';
import AddOnboardingTask from './AddOnboardingTask';
import ModalDelete from './ModalDelete';
import UpdateOnboardingTask from './UpdateOnboardingTask'

import { MDBDataTable } from 'mdbreact';

const API = 'http://localhost:8000';

const data = {
  columns: [
    {
      label: "Task's Description",
      field: 'deskripsi',
      sort: 'asc',
      width: 400
    },
    {
      label: "Status",
      field: 'status',
      sort: 'asc',
      width: 200
    },
    {
      label: "Assigned Date",
      field: 'assigned_date',
      sort: 'asc',
      width: 300
    },
    
     {
       label: "Action",
       field: 'action',
       width: 100
     }

  ],
  rows: []
}

export class ListOnboardingTask extends Component {
  constructor(props) {
    super(props);

    this.state = {
      task_list: [],
      loading: true,
      id: '',
      visible: false,
    }
  }

  componentDidMount() {
    axios.get(API + '/supervisor/getTugasOnboarding/3')
      .then(res => {
        const task = res.data;
        this.setState({
          task_list: task,
          loading: false
        })
      })
  }

  


  render() {
    let content;
    let tugas;
    let id_tugas;
    console.log(this.state.task_list)
    if (this.state.loading) {
      content = <div align="center"><p>Loading . . .</p></div>;
    } else {
      let list_task = this.state.task_list.map((task, index) => {
        tugas = task.deskripsi
        id_tugas = task.id

        return (
          {
            
            deskripsi: task.deskripsi,
            status: task.status,
            assigned_date: task.assigned_date,
            action:
            <Row>
           <UpdateOnboardingTask task={tugas} task_id = {id_tugas}/>
            
            
                  &nbsp;&nbsp;&nbsp; &nbsp;
                  <ModalDelete id={id_tugas} />

           
            </Row>
            
           
          }
        );
      });

      data.rows = [];
      for (var i = 0; i < list_task.length; i++) {
        data.rows.push(list_task[i]);
      }

      content = (
        <MDBDataTable borderless striped hover small btn data={data} />
      );
    }


    return (
      <div className="animated fadeIn">
       <div align="center">
          <h3>Task List</h3>
        </div>
       
        <br></br>
        <AddOnboardingTask />
        <br></br>

        <Row>
          <Col>
            <Card>
              <CardBody>
                {content}
              </CardBody>
            </Card>
          </Col>
        </Row>
       
      </div>
    );
  }
}

export default ListOnboardingTask;