import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import axios from 'axios';
import { Form, Input, Icon, Button,Card ,message} from "antd";

let id = 0;
const id_lowongan=2;
export default class ResponsibilityForm extends React.Component {
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
        console.log(values.names.length);
        var qs=(require('qs'));
         axios.post('http://localhost:8000/po/create-responsibility', qs.stringify({
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
          message.info('Message', 9);
          message.loading('Saving...', 4)
          .then(() => message.success('Saving finished', 2.5))
          .then(() => message.success('Vacancy Saved', 2.5))
          .then(() =>  window.location.href = '#/vacancies');
        

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
      label={index === 0 ? 'Responsibility' : ''}
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
              message: "Please input responsibility's description or delete this field."
            }
          ]
        })(
          <Input disabled={disable}
            placeholder="Responsibility Description"
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
    
      <Form disabled={disable} onSubmit={this.handleSubmit}>
        {formItems}
        <Form.Item disabled={disable} {...formItemLayoutWithOutLabel}>
          <Button   disabled={disable} type="dashed" onClick={this.add} style={{ width: "92%" }}>
            <Icon type="plus" /> Add Responsibility
          </Button>
        </Form.Item>
        <Form.Item disabled={disable} {...formItemLayoutWithOutLabel}>
          <Button className="float-right" shape="round" disabled={disable} type="primary" htmlType="submit">
            Submit 
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

