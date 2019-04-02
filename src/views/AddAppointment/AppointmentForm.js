
import React from 'react';
import 'antd/dist/antd.css';
import {
  Form, Select, Input, Button, DatePicker, TimePicker
} from 'antd';
import moment from 'moment';
import axios from 'axios';

const { Option } = Select;

export default class AppointmentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pastHour : null,
      pastMinute : null,
      disableHour : null,
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        console.log(values['date'].format('YYYY-MM-DD'));
        // var qs = require('qs');
        // axios.post('http://localhost:8000/po/create-appointment', qs.stringify({
        //   'id_lamaran': this.state.idLamaran,
        //   'date': this.state.date,
        //   'start': this.state.starttime,
        //   'end': this.state.finishtime,
        //   'lokasi' : this.state.location
        // }),
        // {
        //   headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        // })
        // window.location.href = '/#/appointmens';
      }
    });
  }

  handleDisabledTime = (time, timeString) => {
    var hours = [];
    var hour = time.hour();
    for(var i= 0;i < hour;i++){
      hours.push(i);
    }
    this.setState({
      pastHour : time.hour(),
      pastMinute : time.minute(),
      disableHour : hours,
    });
  }

  handleDisabledMinutes = (selectedHour) =>{
    var minute = [];
    if(selectedHour === this.state.pastHour){
      for(var i = 0; i < this.state.pastMinute; i++){
        minute.push(i);
      }
    }
    return minute;
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    function disabledDate(current) {
      let today = new Date();
      return current < moment(today, "YYYY-MM-DD");
    }

    return (
      <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
        <Form.Item
          label="date"
        >
          {getFieldDecorator('date', {
            rules: [{ type: 'object', required: true, message: 'Please select date!' }],
          })(
            <DatePicker format="YYYY-MM-DD" disabledDate={disabledDate}/>
          )}
        </Form.Item>
        <Form.Item
          label="Start Time"
        >
          {getFieldDecorator('start-time', {
            rules: [{ type: 'object', required: true, message: 'Please select start time!' }],
          })(
            <TimePicker format={'HH:mm'} onChange={this.handleDisabledTime}/>
          )}
        </Form.Item>
        <Form.Item
          label="Finish Time"
        >
          {getFieldDecorator('finish-time', {
            rules: [{ type: 'object', required: true, message: 'Please select finish time!' }],
          })(
            <TimePicker format={'HH:mm'} disabledHours={() => this.state.disableHour} disabledMinutes={this.handleDisabledMinutes}/>
          )}
        </Form.Item>
        <Form.Item
          label="Location"
        >
          {getFieldDecorator('location', {
            rules: [{ required: true, message: 'Please input location' }],
          })(
            <Input placeholder="Enter Location"/>
          )}
        </Form.Item>
        <Form.Item
          label="Gender"
        >
          {getFieldDecorator('interviewer', {
            rules: [{ required: true, message: 'Please select Interviewer' }],
          })(
            <Select
              placeholder="Select an interviewer"
            >
              <Option value="john">John</Option>
              <Option value="doe">Doe</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item
          wrapperCol={{ span: 12, offset: 5 }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
