import React from 'react';
import { Form, Card, Col } from 'antd';
import  AddTaskForm from './AddTaskForm';

export default class AddTask extends React.Component{
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
    const TaskForm = Form.create({ name: 'task' })(AddTaskForm);

    return (
      <div className="animated fadeIn">
        <div align="center">
          <h3>Add Task</h3>
        </div>
        <div align="center">
            <Col offset={2}>
              <TaskForm />
            </Col>
        </div>
      </div>
      );
    }
}
