import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import axios from 'axios';
import { Form, Input, Icon, Button } from "antd";

let id = 0;

export default class RequirementForm extends React.Component {
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
        const { keys, names } = values;
        console.log(values)
        console.log(this.props.id_low)
        console.log("Received values of form: ", values);
        console.log("Merged values:", keys.map(key => names[key]));
        var qs=(require('qs'));
        // axios.post('http://localhost:8000/po/create-requirement', qs.stringify({
        //   'id_lowongan':this.props.id_lowongan,
        //   'deskripsi':this.
        // }))
      }
    });
  };

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
      // labelCol: {
      //   xs: { span: 24 },
      //   sm: { span: 4 }
      // },
      // wrapperCol: {
      //   xs: { span: 24 },
      //   sm: { span: 20 }
      // }
    };
    const formItemLayoutWithOutLabel = {
    //   wrapperCol: {
    //     xs: { span: 24, offset: 0 },
    //     sm: { span: 20, offset: 4 }
    //   }
    };
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
              required: true,
              whitespace: true,
              message: "Please input requirement's description or delete this field."
            }
          ]
        })(
          <Input
            placeholder="Requirement Description"
            style={{ width: "92%", marginRight: 8 }}
          />
        )}
        {keys.length > 0 ? (
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            disabled={keys.length === 0}
            onClick={() => this.remove(k)}
          />
        ) : null}
      </Form.Item>
    ));
    return (
      <Form onSubmit={this.handleSubmit}>
        {formItems}
        <Form.Item {...formItemLayoutWithOutLabel}>
          <Button type="dashed" onClick={this.add} style={{ width: "92%" }}>
            <Icon type="plus" /> Add Requirement
          </Button>
        </Form.Item>
        <Form.Item {...formItemLayoutWithOutLabel}>
           <Button type="primary" htmlType="submit">
            Submit
          </Button> 
        </Form.Item>
      </Form>
    );
  }
}

