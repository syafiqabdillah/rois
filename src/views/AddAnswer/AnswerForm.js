import React from 'react';
import {
  Form, Icon, Input, Button,
} from 'antd';
import Modals from './Modals';


export default class AnswerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasErrors : null,
      link : null,
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
  }

  render() {
    const {
      getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
    } = this.props.form;

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
          {/*<Button
            type="primary"
            htmlType="submit"
            disabled={this.state.hasErrors}
          > Submit
          </Button>*/}
          <Modals error={this.state.hasErrors} link={this.state.link} remoteTest={3}/>
        </Form.Item>
      </Form>
    );
  }
}
