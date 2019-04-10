import React from 'react';
import 'antd/dist/antd.css';
import {
  Form, Select, Input, Button, DatePicker, Card, TimePicker, message
} from 'antd';
import moment from 'moment';
import axios from 'axios';
import RequirementForm from './RequirementForm';


const { Option } = Select;
const { RangePicker } = DatePicker;
const FormRequirement = Form.create({ name: 'requirement' })(RequirementForm);
export default class VacancyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submit: false,
      lowongan_id: '',
      req_res_disabled: false,
      form_req_visible:false

    }
  }


  handleSubmit = (event) => {

    event.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        var qs = require('qs');
        axios.post('http://localhost:8000/po/create-lowongan', qs.stringify({
          'nama': values['name'],
          'start_date': values['range-picker'][0].format('YYYY-MM-DD'),
          'end_date': values['range-picker'][1].format('YYYY-MM-DD'),
          'publish_date': values['range-picker'][0].format('YYYY-MM-DD'),
          'divisi': values['division'],
          'lokasi': values['location'],
          'tipe': values['type'],
        }),
          {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
          })
          .then(response => {
            console.log(response)
            this.setState({ lowongan_id: response.data })
            console.log(this.state.lowongan_id)
          })
          .catch(error => {
            console.log(error.response)
          });

        this.setState({ 
          submit: true,
          req_res_disabled: false,
          form_req_visible: !this.state.form_req_visible
        });
      }
    });
  }


  render() {
    
    
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {

    }

    const rangeConfig = {
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
            )}
          </Form.Item>
          <Form.Item>
          <Button disabled={this.state.submit} className="float-right" type="primary" htmlType="submit" shape="round" >Next</Button>
          </Form.Item>
        </Form>
        </Card>
        <br></br>

        {
          this.state.form_req_visible
            ? <FormRequirement  id_low={this.state.lowongan_id} />
             
              
            : null
        }
        


      </div>
    );

  }
}
