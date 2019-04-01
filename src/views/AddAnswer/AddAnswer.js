import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  Badge,
  Button,
  ButtonDropdown,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Row,
} from 'reactstrap';

import CountDown from './CountDown';
import Modals from './Modals';

class AddAnswer extends React.Component{
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      error : null,
      modals : false,
      link : '',
    };
  }

  showModals = () =>{
    this.setState({
      modals : true
    })
  }

  //
  handleChange = (event) => {
    const {value} = event.target;
    this.setState({
      error : this.getErrorMessage(value),
      link : value,
    })
  }

  getErrorMessage = (value) => {
    const isGitUrl = require('is-git-url');
    if(isGitUrl(value)){
      return false
    } else{
      return true
    }
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState }});
  }


  render() {
    const {error, link} = this.state;
    const textStyle = {
      color : "#979797",
    };
    return (
      <div className="animated fadeIn">
          <Col xs="15" sm="8">
            <Card>
              <CardHeader>
                <strong>Submission</strong>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs="12" align="center">
                    <CountDown date={`2019-4-15`}/>
                    <br/>
                    <p style={textStyle}> Submission format : https://github.com/johndoe/submission.git </p>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12">
                    <form>
                      <Input type="text" onChange={this.handleChange} name="cclinkanswer" placeholder="Enter Link Github" required />
                      <br/>
                    </form>
                  </Col>
                </Row>
                <Row>
                  <Col xs="6" sm="4"></Col>
                  <Col xs="6" sm="4"></Col>
                  <Col sm="4"><Modals error={error} link={this.state.link}/></Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
      </div>
      );
    }
}

export default AddAnswer;
