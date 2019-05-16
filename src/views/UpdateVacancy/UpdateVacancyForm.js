import React from 'react';

import { Form, Select, Input, Button, DatePicker, Card, message,InputNumber } from 'antd';
import moment from 'moment';
import axios from 'axios';


const { Option } = Select;
const { RangePicker } = DatePicker;


const API = 'http://localhost:8000';
export default class UpdateVacancyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submit: false,
      id:"",
      nama:"",
      divisi:"",
      start_date:"",
      end_date:"",
      lokasi:"",
      tipe:"",
      requirement:[],
      responsibility:[],
      req_res_disabled: true,
      form_req_res_visible: true

    }
  }

  componentDidMount(){
    axios.get(API + '/po/lowongan/' + this.props.id_lowongan)
    .then(res=>{
      const lowongan = res.data;
      this.setState({
        requirement: lowongan.requirement,
        responsibility: lowongan.responsibility,
        id:lowongan.id,
        nama:lowongan.nama,
        divisi:lowongan.divisi,
        start_date: lowongan.start_date,
        end_date: lowongan.end_date,
        lokasi:lowongan.lokasi,
        tipe:lowongan.tipe,
        position_available:lowongan.posisi_tersedia,
    })
    });
    
  }


  handleSubmit = (event) => {

    event.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        var qs = require('qs');
        axios.post('http://localhost:8000/po/update-lowongan', qs.stringify({
        'id':this.props.id_lowongan,
        'nama': values['name'],
          'start_date': values['range-picker'][0].format('YYYY-MM-DD'),
          'end_date': values['range-picker'][1].format('YYYY-MM-DD'),
          'publish_date': values['range-picker'][0].format('YYYY-MM-DD'),
          'divisi': values['division'],
          'lokasi': values['location'],
          'tipe': values['type'],
          'position_available':values['position_available'],
        }),
          {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
          })
          .then(response => {
            this.setState({ lowongan_id: response.data })
          })
          .catch(error => {
            console.log(error.response)
          });
          message.info('Message', 9);
          message.loading('Saving...', 4)
          .then(() => message.success('Saving finished', 2.5))
          .then(() => message.success('Vacancy updated', 2.5))
          .then(() =>  window.location.href = '#/vacancy/'+this.props.id_lowongan);
      }
    });
  }



  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {

    }

    const rangeConfig = {
      initialValue:[ moment(this.state.start_date,"YYYY-MM-DD"), moment(this.state.end_date,"YYYY-MM-DD")],
      rules: [{ type: 'array', required: true, message: 'Please select time!' }],
    };

    function disabledDate(current) {
      let today = new Date();
      return current < moment(today).add(-1, 'days');
    }


    return (
      <div>
        <Card>
        <Form  {...formItemLayout} onSubmit={this.handleSubmit} >
          <Form.Item
            label="Name"
          >
            {getFieldDecorator('name', {
              initialValue: this.state.nama,
              rules: [{
                pattern: new RegExp("^[A-Za-z]"),
                required: true, message: 'Please input the right values for vacancy name',
              }],
            })(
              <Input disabled={this.state.submit} style={{ width: "92%" }} />
            )}
          </Form.Item>
          <Form.Item
            label="Division"
            hasFeedback
          >
            {getFieldDecorator('division', {
               initialValue: this.state.divisi,
              rules: [
                { pattern: new RegExp("^[A-Za-z]"), required: true, message: 'Please select your vacancy division!' },
              ],
            })(
              <Select disabled={this.state.submit} style={{ width: "92%" }} placeholder="Select division">
                <Option value="Marketing">Marketing</Option>
                <Option value="Sales">Sales</Option>
                <Option value="Support">Support</Option>
                <Option value="Commerce">Commerce</Option>
                <Option value="Technology">Technology</Option>
                <Option value="Finance and People Operation">Support</Option>
                <Option value="Other">Other</Option>
              </Select>
            )}
          </Form.Item>

          <Form.Item
            label="Location"
          >
            {getFieldDecorator('location', {
               initialValue: this.state.lokasi,
              rules: [{
                pattern: new RegExp("^[A-Za-z]"), type:'string', required: true, message: 'Please input the right values vacancy location',
              }],
            })(
              <Input disabled={this.state.submit} style={{ width: "92%" }} />
            )}
          </Form.Item>
          <Form.Item
            label="Type"
            hasFeedback
          >
            {getFieldDecorator('type', {
               initialValue: this.state.tipe,
              rules: [
                {pattern: new RegExp("^[A-Za-z]"), required: true, message: 'Please select vacancy type!' },
              ],
            })(
              <Select disabled={this.state.submit} style={{ width: "92%" }} placeholder="Select vacancy type">
                <Option value="">Please select</Option>
                <Option value="Internship">Internship</Option>
                <Option value="Contract">Contract</Option>
                <Option value="Permanent">Permanent</Option>
              </Select>
            )}
          </Form.Item>

          <Form.Item
            label="Start date - End date"
          >
           {getFieldDecorator('range-picker', rangeConfig)(
              <RangePicker disabled={this.state.submit} onChange={this.onChangeDateRange} format="YYYY-MM-DD" disabledDate={disabledDate} />
            )} </Form.Item>

             <Form.Item
          label = "Position available">
           {getFieldDecorator('position_available', {
             initialValue : this.state.position_available,
             rules: [
                { required: true },
              ],
            })(
               <InputNumber disabled={this.state.submit} min={1} max={10}  /> 
                )}
         
           </Form.Item>
          <Form.Item>
          <Button disabled={this.state.submit} className="float-right" type="primary" htmlType="submit" shape="round" >Update Vacancy</Button>
          </Form.Item>
        </Form>
        </Card>
        <br></br>






      </div>
    );

  }
}
