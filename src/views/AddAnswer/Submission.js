import React from 'react';
import {
  Col,
  Row,
} from 'reactstrap';
import { Form } from 'antd';
import  AnswerForm from './AnswerForm';

export default class Submission extends React.Component{
  constructor(props) {
    super(props);
  }


  render(){
    const textStyle = {
      color : "#979797",
    };
    const FormAnswer = Form.create({ name: 'answer' })(AnswerForm);
    return(
      <div>
      <Row>
        <Col xs="12" align="center">
          <p style={textStyle}> Submission format : https://github.com/johndoe/submission.git </p>
        </Col>
      </Row>
      <Row>
        <Col xs="12">
          <FormAnswer />
        </Col>
      </Row>
      </div>
    );
  }
}
