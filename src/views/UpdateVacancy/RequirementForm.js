import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import axios from 'axios';
import { Form, Input, Icon, Button,Card } from "antd";

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
        this.props.disable = "true";

    }
});
}
  render() {
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
              required: true,
              whitespace: true,
              message: "Please input requirement's description or delete this field."
            }
          ]
        })(
          <Input disabled={disable}
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
      <Form onSubmit={this.handleSubmit}>
        {formItems}
        <Form.Item disabled={disable} {...formItemLayoutWithOutLabel}>
          <Button disabled={disable} type="dashed" onClick={this.add} style={{ width: "92%" }}>
            <Icon type="plus" /> Add Requirement
          </Button>
        </Form.Item>
        <Form.Item disabled={disable} {...formItemLayoutWithOutLabel}>
           <Button className="float-right" shape="round" disabled={disable} type="primary" htmlType="submit">
            Submit Requirement
          </Button> 
        </Form.Item>
      </Form>
    );
  }
}

