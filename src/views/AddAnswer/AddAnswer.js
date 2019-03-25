import React, { Component } from 'react';
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

class AddAnswer extends React.Component{
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300
    };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState }});
  }

  render() {
    return (
      <div className="animated fadeIn">
          <Col xs="11" sm="10">
            <Card>
              <CardHeader>
                <strong>Submission</strong>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs="12" align="center">
                    <CountDown date={`2019-3-30`}/>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Input type="text" id="cclinkanswer" placeholder="Enter Link Github" required />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12">
                    <Button block color="primary">Submit</Button>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </div>
      );
    }
}

export default AddAnswer;
