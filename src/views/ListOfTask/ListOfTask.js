import React from 'react';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import TaskTable from './TaskTable';

export default class ListOfTask extends React.Component{
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
    };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState }});
  }

  render() {
    return (
      <div className="animated fadeIn">
        <div align="center">
          <h3>List of Tasks</h3>
        </div>
        <div>
          <Button type="primary" href="http://localhost:3000/#/addTask">Add Task</Button>
        </div>
        <div>
          <TaskTable/>
        </div>
      </div>
      );
    }
}
