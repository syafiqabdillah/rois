
import React from 'react';
import 'antd/dist/antd.css';
import {
  Form, Select, Input, Button, DatePicker, TimePicker, message
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
        var qs = require('qs');
        axios.post('http://localhost:8000/po/create-appointment', qs.stringify({
          'id_lamaran': this.props.idLamaran,
          'date': values['date'].format('YYYY-MM-DD'),
          'start': values['start-time'].format('HH:mm'),
          'end': values['finish-time'].format('HH:mm'),
          'lokasi' : values['location'],
          'interviewer' : values['interviewer'],
          'email' : this.props.emailPelamar
        }),
        {
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
        message.info('Message', 9);
        message.loading('Saving...', 3)
        .then(() => message.success('Saving finished', 2))
        .then(() => message.success('Invitation Sent', 2))
        .then(() => window.location.href = '/#/appointmens');
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

  validateLocationField = (rule, value, callback) => {
   const form = this.props.form;
   const valid = !value.match(/^\d+$/);
   if (value && !valid) {
     callback('Location cannot be only number');
   } else {
     callback();
   }
 }


  render() {
    const { getFieldDecorator } = this.props.form;

    function disabledDate(current) {
      let today = new Date();
      return current < moment(today, "YYYY-MM-DD");
    }

    return (
      <Form labelCol={{ span: 7 }} wrapperCol={{ span: 14 }} onSubmit={this.handleSubmit}>
        <Form.Item
          label="Date"
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
            rules: [{ required: true, message: 'Please input location' },
            { validator: this.validateLocationField, }],
          })(
            <Input placeholder="Enter Location" />
          )}
        </Form.Item>
        <Form.Item
          label="Interviewer"
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
          wrapperCol={{ span: 5, offset: 16 }}
        >
          <Button type="primary" htmlType="submit" shape="round" block>
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
