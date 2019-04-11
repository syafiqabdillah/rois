import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import axios from 'axios';
import { Form, Input, Icon, Button,Card } from "antd";

let name_initial=[];
let key_initial=[];
let merged_initial=[];
let id;
let id_lowongan;
const API = 'http://localhost:8000';
var pathname = window.location.pathname;
console.log(pathname);

export default class RequirementForm extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      id_lowongan:"",
      list_responsibility:[],
      key_initial:[],
      name_initial:[],
      merged_initial:[],
      id:""

    }
  }

  remove = k => {
    console.log("nilai k");
    console.log(k);
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue("keys");
    console.log(keys);
    console.log("after");
    // We need at least one passenger
    if (keys.length === 0) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k)
    });
    console.log(keys);
  };

  remove_initial = k => {
    console.log("nilai k");
    console.log(k);
    const { form } = this.props;
    // can use data-binding to get
    const key = form.getFieldValue("key");
    console.log(key);
    console.log("after");
    // We need at least one passenger
    if (key.length === 0) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      key: key.filter(key => key !== k)
    });
    if (k > -1) {
      merged_initial.splice(k, 1);
    }
    key_initial.pop();
    console.log(key);
  };



  add = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue("keys");
 
    
    const nextKeys = keys.concat(id++);
    console.log("id dan keys")
    console.log(id);
    console.log(keys);
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
        const {keys, names}  = values;
       
        const { key, name } = values;
        const merged_initial_after = key.map(key => name[key]);
        const merged = keys.map(key => names[key]);
        
         var qs=(require('qs'));
          axios.post('http://localhost:8000/po/update-requirement', qs.stringify({
            'id_lowongan':this.props.id_low,
            'deskripsi':merged_initial_after.concat(merged),
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
         window.location.href = '#/vacancy/'+ this.props.id_low;

    }
});
}


componentDidMount(){
  
  console.log("ini id lowongan");
  console.log(this.props.id_low);
  axios.get(API + '/po/requirement/'+this.props.id_low)
  .then(res=>{
    const requirement= res.data;

    console.log(requirement);
    for(var i=0;i<requirement.length;i++){
      name_initial.push(requirement[i].deskripsi)
      key_initial.push(i);
    }    
  
    id= key_initial.length+1;
  
   
    merged_initial=key_initial.map(key => name_initial[key]);
    console.log("start")
   console.log(key_initial);
   console.log(name_initial);
   console.log(merged_initial);
   console.log(id); 
   console.log("end");
  
    
  })
  this.setState({
    key_initial:key_initial,
    name_initial:name_initial,
    merged_initial : merged_initial,
    id:id
  })
};



  



  render() {
    id_lowongan=this.props.id_low;
    // responsibility= this.props.responsibility;
   

    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
     
    };
    const formItemLayoutWithOutLabel = {
   
    };
   
    getFieldDecorator("keys", { initialValue: [] });
    const keys = getFieldValue("keys");  
    console.log("ini keys")
    console.log(keys)
    const formItems = keys.map((k, index) => (
    

      <Form.Item 
      {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
      
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

    getFieldDecorator("key", { initialValue: key_initial });
    const key = getFieldValue("key");
    const formItemsInitial = key_initial.map((k, index) => (
      <Form.Item
        {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
        label={index === 0 ? 'Requirement' : ''}
        required={false}
        key={k}
      >
        {getFieldDecorator(`name[${k}]`, {
          validateTrigger: ["onChange", "onBlur"],
          rules: [
            {
              required: true,
              whitespace: true,
              message: "Please input passenger's name or delete this field."
            }
          ],
          initialValue: merged_initial[index]
        })(
          <Input
            placeholder="passenger name"
            style={{ width: "92%", marginRight: 8 }}
          />
        )}
        {key.length >= 0 ? (
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            onClick={() => this.remove_initial(k)}
          />
        ) : null}
      </Form.Item>
    ));



    return (
    
      <Form  onSubmit={this.handleSubmit}>
      {formItemsInitial}
        {formItems}
        <Form.Item  {...formItemLayoutWithOutLabel}>
          <Button  type="dashed" onClick={this.add} style={{ width: "92%" }}>
            <Icon type="plus" /> Add Requirement
          </Button>
        </Form.Item>
        <Form.Item  {...formItemLayoutWithOutLabel}>
          <Button className="float-right" shape="round"  type="primary" htmlType="submit">
            Submit Requirement
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

