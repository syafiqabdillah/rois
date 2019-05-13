import React, { Component } from 'react';
import axios from 'axios';
import {
  Button, Card, CardBody,
  FormGroup, Input, Label, Col, Row
} from 'reactstrap';
import 'antd/dist/antd.css';
import moment from 'moment';

import { Form, Modal, message} from 'antd';



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
            label="Task Description"
          >
            {getFieldDecorator('description', {
              rules: [{
                pattern: new RegExp("^[A-Za-z]"),
                required: true, message: 'Please input the task description',
              }],
            })(
                <Input placeholder="Start typing here.." autosize />
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
          axios.post('http://localhost:8000/supervisor/create-tugas-onboarding', qs.stringify({
            'deskripsi': values['description'],
            'id_karyawan': '3',
            'id_supervisor': '2',
            'status':'assigned',
            'assigned_date' : today.format('YYYY-MM-DD'),
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

