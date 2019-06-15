import { Table, Divider, Progress } from 'antd';
import React from 'react';
import 'antd/dist/antd.css';
import axios from 'axios';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Division',
    dataIndex: 'division',
    key: 'division',
  },
  {
    title: 'Onboarding Progress',
    dataIndex: 'onboardingprogress',
    key: 'onboardingprogress',
    //render:
  },
  {
    title: 'Task Complete',
    key: 'taskcomplete',
    dataIndex: 'taskcomplete',
  },
  {
    title: 'Action',
    key: 'action',
    dataIndex: 'action',
  },
];

export default class NewTable extends React.Component {
  constructor(props){
    super(props);
      this.state = {
        employees: [],
        loading: true
      }
  }

  componentDidMount(){
    this.fetchData()
  }

  fetchData = () => {
    let id_karyawan = localStorage.getItem('id_karyawan')
    axios.get('http://localhost:8000/su/get-all-employee/' + id_karyawan)
      .then((response) => {
        const profile = response.data;
        const data = []
        console.log(profile)
        let newData = profile.map((item, key) => {
          const idemployee = "http://localhost:3000/#/employeeDashboard/" + item.profile.id
          const taskemployee = "http://localhost:3000/#/tasks-list/" + item.profile.id
            return({
              key: key,
              name: item.profile.name,
              division: item.profile.divisi,
              onboardingprogress: <Progress percent={Math.round(((item.progress.complete)/item.progress.total)*100)} status="active" strokeWidth={10}/>,
              taskcomplete: item.progress.complete + ' / ' + item.progress.total,
              action: <span>
                        <a href={idemployee}>On boarding Report</a>
                        <Divider type="vertical" />
                        <a href={taskemployee}>Edit Task</a>
                      </span>
            })
        });
        this.setState({
          employees: newData,
          loading: false
        })
    });
  }

  render(){
    return (
      <Table columns={columns} dataSource={this.state.employees} />
    )
  }
}
