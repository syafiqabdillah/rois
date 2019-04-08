import React from 'react';
import 'antd/dist/antd.css';
import {
  Form, Select, Input, Button, DatePicker, TimePicker, message
} from 'antd';
import moment from 'moment';
import axios from 'axios';
import RequirementForm from './RequirementForm';
import ResponsibilityForm from './ResponsibilityForm';

const { Option } = Select;
const { RangePicker } = DatePicker;
const FormRequirement = Form.create({ name: 'requirement' })(RequirementForm);
export default class VacancyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonSubmit:false,
      lowongan_id:''
     
    }
  }



  handleSubmit = (event) => {
   
    event.preventDefault();
    this.props.form.validateFields((err, values)=>{
        if(!err){
          console.log('Received values of form: ', values);
            var qs = require('qs');
            axios.post('http://localhost:8000/po/create-lowongan', qs.stringify({
              'nama':values['name'],
              'start_date': values['range-picker'][0].format('YYYY-MM-DD'),
              'end_date': values['range-picker'][1].format('YYYY-MM-DD'),
              'publish_date': values['range-picker'][0].format('YYYY-MM-DD'),
              'divisi': values['division'],
              'lokasi':values['location'],
              'tipe': values['type'],
            }),
              {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
              })
              .then(response => {
                console.log(response)
                this.setState({lowongan_id:response.data})
                console.log(this.state.lowongan_id)
              })
              .catch(error => {
                console.log(error.response)
              });
             
              this.setState({buttonSubmit:true})
            // window.location.href = '#/vacancies';

        }
    });
  }

  // onChangeDateRange = (value, dateString) => {
  //   this.setState({
  //       startdate : dateString[0],
  //       enddate : dateString[1]
  //   });
  // }

  // disablePublished = (startdate, enddate, current) =>{
  //    let startTime = moment(new Date(startdate), 'YYYY-MM-DD');
  //    let endTime = moment(new Date(enddate), 'YYYY-MM-DD');
    
    
  //    let today = (new Date(),'YYYY-MM-DD');
  //    var diffdays = startTime.diff(today, 'days');
  //    console.log(typeof(startTime));
  //    console.log(typeof(today));

  //    console.log(diffdays)
  //       return current < moment(today).add(diffdays, 'days');
   
   
    
  // }

  render(){
   let submitButton;
    const FormResponsibility = Form.create({ name: 'responsibility' })(ResponsibilityForm);
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

      if(this.state.buttonSubmit==true){
        submitButton=(
<Button disabled className = "float-right" type="primary" htmlType="submit" shape="round" >Submit Vacancy</Button>
        
        );
          
      }else{
        submitButton=(
        <Button  className = "float-right" type="primary" htmlType="submit" shape="round" >Submit Vacancy</Button>
        );
      }
      
   
    return(
      <div>
        <Form {...formItemLayout}  onSubmit={this.handleSubmit} >
        <Form.Item
          label="Name"
        >
          {getFieldDecorator('name', {
            rules: [{
              required: true, message: 'Please input vacancy name',
            }],
          })(
            <Input style={{ width: "92%" }} />
          )}
        </Form.Item>
        <Form.Item
          label="Division"
          hasFeedback
        >
          {getFieldDecorator('division', {
            rules: [
              { required: true, message: 'Please select your vacancy division!' },
            ],
          })(
            <Select style={{ width: "92%" }} placeholder="Select division">
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
              required: true, message: 'Please input vacancy location',
            }],
          })(
            <Input style={{ width: "92%" }} />
          )}
        </Form.Item>
        <Form.Item
          label="Type"
          hasFeedback
        >
          {getFieldDecorator('type', {
            rules: [
              { required: true, message: 'Please select vacancy type!' },
            ],
          })(
            <Select style={{ width: "92%" }} placeholder="Select vacancy type">
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
            <RangePicker  onChange={this.onChangeDateRange} format = "YYYY-MM-DD" disabledDate={disabledDate} />
          )}
        </Form.Item>
          
           <Form.Item>
             {submitButton}
         </Form.Item>
        </Form>

        <FormRequirement id_low={this.state.id_lowongan}/>
          <FormResponsibility/>
 



     
        
       
        </div>
    );
  
  }
}
