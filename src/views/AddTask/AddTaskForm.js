import React from 'react';
import { Form, Select, Input, Button, message } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';

const { Option } = Select;

export default class AddTaskForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const name = values['name']
        const division = values['division']
        const description = values['description']
        console.log('name', name)
        console.log('divison', division)
        console.log('description', description)

        var qs = require('qs');

        axios.post('http://localhost:8000/su/create-task', qs.stringify({
          'name': name,
          'division': division,
          'description': description
        }),
        {
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
        message.info('Message', 9);
        message.loading('Saving...', 3)
        .then(() => message.success('Saving finished', 2))
        .then(() => window.location.href = '/#/tasks');
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { TextArea } = Input;
    return (
      <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
        <Form.Item label="Division">
          {getFieldDecorator('division', {
            rules: [{ required: true, message: 'Please select division!' }],
          })(
            <Select
              placeholder="Select the division that has this task"
              onChange={this.handleSelectChange}
            >
              <Option value="Technology">Technology</Option>
              <Option value="Marketing">Marketing</Option>
              <Option value="Sales">Sales</Option>
              <Option value="Support">Support</Option>
              <Option value="Commerce">Commerce</Option>
              <Option value="Finance">Finance</Option>
              <Option value="People Operation">People Operation</Option>
            </Select>,
          )}
        </Form.Item>
        <Form.Item label="Task Name">
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please input task name!' }],
          })(<Input placeholder="Input  Task Title" />)}
        </Form.Item>
        <Form.Item label="Description">
          {getFieldDecorator('description', {
            rules: [{ required: true, message: 'Please input task description!' }],
          })(
            <TextArea rows={10} placeholder="Input task description"/>,
          )}
        </Form.Item>
        <Form.Item wrapperCol={{ span: 5, offset: 12 }}>
          <Button type="primary" htmlType="submit" shape="round" block>
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
