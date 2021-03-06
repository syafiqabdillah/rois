import React from 'react';
import {
  Form, Icon, Input,
} from 'antd';
import Modals from './Modals';
import { Col } from 'antd';


export default class AnswerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasErrors : null,
      link : '',
    }
  }

  componentDidMount() {
    this.setState({
      hasErrors : true
    });
  }

  hasErrors = (fieldsValue) => {
    const isGitUrl = require('is-git-url');
    if(isGitUrl(fieldsValue)){
      return false
    } else{
      return true
    }
  }

  handleChange = (e) => {
    const {value} = e.target;
    this.setState({
      hasErrors : this.hasErrors(value),
      link : value
    })
    console.log(this.state.link);
  }

  render() {
    const { getFieldDecorator, getFieldError, isFieldTouched } = this.props.form;

    // Only show error after a field is touched.
    const answerLinkError = isFieldTouched('answer-link') && getFieldError('answer-link');
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item
          validateStatus={answerLinkError ? 'error' : ''}
          help={answerLinkError || ''}
        >
          {getFieldDecorator('answer-link', {
            rules: [{ required: true, message: 'Please input your git link!' }],
          })(
            <Input prefix={<Icon type="github" style={{ color: 'rgba(0,0,0,.25)' }} />} onChange={this.handleChange} placeholder="Enter Git Link" />
          )}
        </Form.Item>
        <Form.Item>
          <Col span={5} offset={19}><Modals error={this.state.hasErrors} link={this.state.link} remoteTest={this.props.idRemoteTest}/></Col>
        </Form.Item>
      </Form>
    );
  }
}
