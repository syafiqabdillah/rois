import { Table, Divider, Progress } from 'antd';
import React from 'react';
import 'antd/dist/antd.css';
import axios from 'axios';

const columns = [
  {
    title: 'Task Name',
    dataIndex: 'taskname',
    key: 'name',
  },
  {
    title: 'Division',
    dataIndex: 'division',
    key: 'division',
  },
  {
    title: 'Action',
    key: 'action',
    dataIndex: 'action',
  },
];

export default class TaskTable extends React.Component {
  constructor(props){
    super(props);
      this.state = {
        tasks: [],
        loading: true
      }
  }

  componentDidMount(){
    this.fetchData()
  }

  fetchData = () => {
    axios.get('http://localhost:8000/su/get-all-task')
      .then((response) => {
        const tasks = response.data;
        const data = []
        let newData = tasks.map((item, key) => {
            const taskemployee = "http://localhost:3000/#/updateTask/" + item.id
            return({
              key: key,
              taskname: item.name,
              division: item.division,
              description: item.description,
              action: <a href={taskemployee}>Edit Task</a>
          })
        });
        this.setState({
          tasks: newData,
          loading: false
        })
    });
  }

  render(){
    return (
      <Table columns={columns}
      expandedRowRender={record => <p style={{ margin: 0 }}>{record.description}</p>}
      dataSource={this.state.tasks}/>
    )
  }
}
