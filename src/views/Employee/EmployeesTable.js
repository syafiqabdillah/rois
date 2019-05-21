import React, { Component } from 'react';
import axios from 'axios';
import 'antd/dist/antd.css';
import { Progress, Button } from 'antd';
import { Card, CardBody, Col, Row} from 'reactstrap';
import { MDBDataTable } from 'mdbreact';

const data = {
  columns: [
    {
      label: "Employee Name",
      field: 'name',
      sort: 'asc',
      width: 150
    },
    {
      label: 'Division',
      field: 'division',
      width: 150
    },
    {
      label: 'Onboarding Progress',
      field: 'progress',
      width: 270
    },
    {
      label: 'Task Completed',
      field: 'complete',
      width: 50
    },
    {
      label: 'Action',
      field: 'action',
      width: 150
    },
  ],
  rows: []
};

export default class EmployeesTable extends Component {
  constructor(props){
    super(props);

    this.state = {
      employees: [],
      loading: true
    }
  }

  componentDidMount(){
    this.fetchData();
  }

  fetchData = () => {
    let id_karyawan = localStorage.getItem('id_karyawan')
    axios.get('http://localhost:8000/su/get-all-employee/' + id_karyawan)
      .then((response) => {
        const profile = response.data;
        console.log(profile);
        this.setState({
          employees: profile,
          loading: false
        })
    });
  }

  render() {
    let content;

    if (this.state.loading){
      content = <div align="center"><p>Loading . . .</p></div>;
    } else {
      let list_appointment = this.state.employees.map((employee, index) => {
        console.log('employee');
        console.log(employee);
        const idemployee = "http://localhost:3000/#/employeeDashboard/" + employee.profile.id
        const taskemployee = "http://localhost:3000/#/tasks-list/" + employee.profile.id
        let progress = Math.round(((employee.progress.complete)/employee.progress.total)*100)
        return (
          {
          name : employee.profile.name,
          division : employee.profile.divisi,
          progress : <Progress percent={progress} strokeWidth={15}/>,
          complete : employee.progress.complete + ' / ' + employee.progress.total,
          action: <Button.Group>
                    <Button type="primary" icon="line-chart" size='large' href={idemployee} ghost/>
                    <Button type="primary" icon="edit" size='large' href={taskemployee}/>
                  </Button.Group>
          }
        );
      });

      data.rows = [];

      for (var i = 0; i < list_appointment.length; i++) {
        data.rows.push(list_appointment[i]);
      }

      content = (
        <MDBDataTable borderless striped hover btn data={data} />
      );
    }

    return (
      <div className="animated fadeIn">
        <div align="center">
          <h3>List of Employee</h3>
        </div>
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
