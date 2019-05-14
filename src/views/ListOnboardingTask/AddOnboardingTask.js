import React, { Component } from 'react';
import axios from 'axios';
import {
  Button, Card, CardBody,
  FormGroup, Label, Col, Row
} from 'reactstrap';
import 'antd/dist/antd.css';
import moment from 'moment';

import { Form, Modal, message, Input} from 'antd';
const { TextArea } = Input;



const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
  // eslint-disable-next-line
  
  class extends React.Component {
   
    render() {
      const {
        visible, onCancel, onCreate, form, confirmLoading
      } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="Create a new task"
          okText="Create"
          onCancel={onCancel}
          onOk={onCreate}
          confirmLoading={confirmLoading}
        >
          <Form layout="vertical">
         
          <Form.Item
            label="Task Name"
          >
            {getFieldDecorator('name', {
              rules: [{
                pattern: new RegExp("^[A-Za-z]"),
                required: true, message: 'Please input the task name',
              }],
            })(
                <Input placeholder="Start typing here.." autosize />
            )}
          </Form.Item>
          <Form.Item
            label="Task Description"
          >
            {getFieldDecorator('description', {
              rules: [{
                pattern: new RegExp("^[A-Za-z]"),
                required: true, message: 'Please input the task description',
              }],
            })(
                <TextArea placeholder="Start typing here.." autosize />
            )}
          </Form.Item>
          </Form>
        </Modal>
      );
    }
  }
);


const today = moment();

class AddOnboardingTask extends Component {

  state = {
    visible: false,
   
  };

  showModal = () => {
    this.setState({ visible: true });
  }

  handleCancel = () => {
    this.setState({ visible: false });
  }

  handleCreate = () => {
    const form = this.formRef.props.form;
    
      form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          var qs = require('qs');
          var id_karyawan_onboarding = localStorage.getItem('id_karyawan_onboarding')
          axios.post('http://localhost:8000/supervisor/create-tugas-onboarding', qs.stringify({
            'deskripsi': values['description'],
            'id_karyawan': id_karyawan_onboarding,
            'status':'assigned',
            'assigned_date' : today.format('YYYY-MM-DD'),
            'nama':values['name']
          }),
            {
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
            .then(response => {
              console.log(response)
             
            })
            .catch(error => {
              console.log(error.response)
            });
           
            
      form.resetFields();
      this.setState({ visible: false });
      window.location.reload();
        }else{
          return;
        }
       

      });
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

  render() {
    return (
      <div>
       
     <Button color="primary"  className="btn-pill" onClick={this.showModal}>New Onboarding Task</Button>
        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
         {/* <ListOnboardingTask/> */}
        
       
      </div>
    );
  }
}
export default AddOnboardingTask;

