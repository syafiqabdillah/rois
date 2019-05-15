import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'reactstrap';
import 'antd/dist/antd.css';
import { Form, Modal, Input} from 'antd';
const { TextArea } = Input;

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
  // eslint-disable-next-line

  class extends React.Component {


    render() {
      const { visible, onCancel, onCreate, form, confirmLoading } = this.props;
      const { getFieldDecorator } = form;

      // console.log(this.props.task.nama);
      // console.log(this.props.task.id);
      return (
        <Modal
          visible={visible}
          title="Update task description"
          okText="Update"
          onCancel={onCancel}
          onOk={onCreate}
          confirmLoading={confirmLoading}
        >
          <Form layout="vertical">

          <Form.Item
            label="Task Name"
          >
            {getFieldDecorator('name', {
              initialValue: this.props.task.nama,
              rules: [{
                pattern: new RegExp("^[A-Za-z]"),
                required: true, message: 'Please input the task name',
              }],
            })(
                <Input placeholder="Start typing here.." autosize={{ minRows: 1, maxRows: 3 }} />
            )}
          </Form.Item>
          <Form.Item
            label="Task Description"
          >
            {getFieldDecorator('description', {
              initialValue: this.props.task.description,
              rules: [{
                pattern: new RegExp("^[A-Za-z]"),
                required: true, message: 'Please input the task description',
              }],
            })(
                <TextArea placeholder="Start typing here.." autosize={{ minRows: 1, maxRows: 3 }} />
            )}
          </Form.Item>
          </Form>
        </Modal>
      );
    }
  }
);


class UpdateOnboardingTask extends Component {
  state = {
    visible: false,
    confirmLoading : false,

  };

  showModal = () => {
    this.setState({ visible: true,
      confirmLoading:false});
  }

  handleCancel = () => {
    this.setState({ visible: false ,
      confirmLoading:false});
  }

  handleUpdate = () => {
    const form = this.formRef.props.form;

      form.validateFields((err, values) => {
        if (!err) {
          this.setState({confirmLoading: true});
          console.log('Received values of form: ', values);
          var qs = require('qs');
          axios.post('http://localhost:8000/supervisor/update-tugas-onboarding/', qs.stringify({
          'id':this.props.task.key,
          'deskripsi': values['description'],
          'nama' :values['name']
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
      setTimeout(() => {
        this.setState({
          confirmLoading: false,
          visible:false,
        });
        window.location.reload();
      }, 2000);


        }else{
          return;
        }

      });

  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

  render() {
    let desc = this.props.task
    //console.log("this.props.task")
    //console.log(desc);

    return (
      <div>

       <Button outline color="primary" className="btn-pill" onClick={this.showModal}>
                 <i className="cui-pencil icons " title="Update Task"></i>
                 </Button>
             <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleUpdate}
          task = {desc}
          confirmLoading={this.state.confirmLoading}
        />

      </div>
    );
  }
}
export default UpdateOnboardingTask;
