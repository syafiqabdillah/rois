import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'reactstrap';
import 'antd/dist/antd.css';
import moment from 'moment';

import { Form, Modal, Input, Select } from 'antd';
const { TextArea } = Input;
const { Option } = Select;

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
  // eslint-disable-next-line

  class extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        template_task: []
      }
    }

    componentDidMount(){
      axios.get('http://localhost:8000/supervisor/get-template-task')
      .then(res => {
        const template_task = res.data;
        //console.log(template_task);
        this.setState({template_task: template_task})
        //console.log(this.state)
      })
    }

    render() {
      const {
        visible, onCancel, onCreate, form, confirmLoading
      } = this.props;

      let template_task = this.state.template_task;
      console.log(template_task);
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

            <Form.Item label="Task Name" hasFeedback>
              {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Please select a task name!' }],
              })(
                <Select placeholder="Please select a task name">
                  { template_task.map(task => <Option key={task.id} value={task.nama}>{task.nama}</Option>)}
                </Select>,
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
                <TextArea placeholder="Start typing here.." />
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
    confirmLoading: false,
    template_task: []
  };

  // componentWillMount(){
  //   axios.get('http://localhost:8000/supervisor/get-template-task')
  //     .then(res => {
  //       console.log(res.data)
  //       this.setState({ template_task: res.data })
  //     })
  // }

  showModal = () => {
    this.setState({
      visible: true,
      confirmLoading: false
    });
  }

  handleCancel = () => {
    this.setState({
      visible: false,
      confirmLoading: false
    });
  }

  handleCreate = () => {
    const form = this.formRef.props.form;

    form.validateFields((err, values) => {
      if (!err) {
        this.setState({ confirmLoading: true });
        //console.log('Received values of form: ', values);
        var qs = require('qs');
        var id_karyawan_onboarding = localStorage.getItem('id_karyawan_onboarding')
        //console.log(id_karyawan_onboarding);
        axios.post('http://localhost:8000/supervisor/create-tugas-onboarding', qs.stringify({
          'deskripsi': values['description'],
          'id_karyawan': localStorage.getItem('id_karyawan_onboarding'),
          'status': 'Assigned',
          'assigned_date': today.format('YYYY-MM-DD'),
          'nama': values['name']
        }),
          {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
          })
          .then(response => {
            //console.log(response)
            this.setState({
              confirmLoading: false,
              visible: false,
            });
            form.resetFields();
            window.location.reload();
          })
          .catch(error => {
            console.log(error.response)
          });

      } else {
        return;
      }


    });

  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

  render() {
    //console.log('tempate task : ' + this.state.template_task)
    return (
      <div>

        <Button color="primary" className="btn-pill" onClick={this.showModal}>New Onboarding Task</Button>
        <CollectionCreateForm
          //template_task={this.state.template_task}
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
          confirmLoading={this.state.confirmLoading}
        />
        {/* <ListOnboardingTask/> */}


      </div>
    );
  }
}
export default AddOnboardingTask;
