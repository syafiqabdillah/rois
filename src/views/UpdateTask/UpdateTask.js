import React from 'react';
import { Form, Card, Col } from 'antd';
import  UpdateTaskForm from './UpdateTaskForm';

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
    const UpdateForm = Form.create({ name: 'update task' })(UpdateTaskForm);

    return (
      <div className="animated fadeIn">
        <div align="center">
          <h3>Update Task</h3>
        </div>
        <div align="center">
            <Col offset={2}>
              <UpdateForm taskid={this.props.match.params.id}/>
            </Col>
        </div>
      </div>
      );
    }
}
