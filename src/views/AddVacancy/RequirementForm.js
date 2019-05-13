import React from "react";
import "antd/dist/antd.css";
import axios from 'axios';
import { Form, Input, Icon, Button,Card } from "antd";
import ResponsibilityForm from './ResponsibilityForm';

let id = 0;
export default class RequirementForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      submit: false,
      form_res_visible:false

    }
  }

  

  remove = k => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue("keys");
    // We need at least one passenger
    if (keys.length === 0) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k)
    });
  };

  add = () => {
    const { form } = this.props;
    console.log(this.props);
    // can use data-binding to get
    const keys = form.getFieldValue("keys");
    const nextKeys = keys.concat(id++);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const {names,keys}  = values;
        var qs=(require('qs'));
         axios.post('http://localhost:8000/po/create-requirement', qs.stringify({
           'id_lowongan':this.props.id_low,
           'deskripsi':values.names,
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
        this.setState({ 
          submit: true,
          form_res_visible: !this.state.form_res_visible
        });

    }
});
}
  render() {
    const FormResponsibility = Form.create({ name: 'responsibility' })(ResponsibilityForm);
    let id_lowongan = this.props.id_low;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {

    };
    const formItemLayoutWithOutLabel = {

    };

    let disable= this.props.disable;

    getFieldDecorator("keys", { initialValue: [] });
    const keys = getFieldValue("keys");


    const formItems = keys.map((k, index) => (
      <Form.Item
      {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
      label={index === 0 ? 'Requirement' : ''}
      required={false}
      key={k}
      >
        {getFieldDecorator(`names[${k}]`, {
          validateTrigger: ["onChange", "onBlur"],

          rules: [
            {
              pattern: new RegExp("^[A-Za-z]"),
              required: true,
              whitespace: true,
              message: "Please input requirement's description or delete this field."
            }
          ]
        })(
          <Input disabled={this.state.submit}
            placeholder="Requirement Description"
            style={{ width: "92%", marginRight: 8 }}
          />
        )}
        {keys.length > 0 ? (
          <Icon disabled={disable}
            className="dynamic-delete-button"
            type="minus-circle-o"
            disabled={keys.length === 0}
            onClick={() => this.remove(k)}
          />
        ) : null}
      </Form.Item>

    ));
   
    return (
      <Card>
      <Form onSubmit={this.handleSubmit}>
        {formItems}
        <Form.Item  {...formItemLayoutWithOutLabel}>
          <Button disabled={this.state.submit} type="dashed" onClick={this.add} style={{ width: "92%" }}>
            <Icon type="plus" /> Add Requirement
          </Button>
        </Form.Item>
        <Form.Item  {...formItemLayoutWithOutLabel}>
           <Button disabled={this.state.submit} className="float-right" shape="round"  type="primary" htmlType="submit">
            Next
          </Button> 
        </Form.Item>
      </Form>
      {
          this.state.form_res_visible
            ? <FormResponsibility  id_low={id_lowongan} />
             
              
            : null
        }
      </Card>
    );
  }
}
