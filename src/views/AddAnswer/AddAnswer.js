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
      timeout: 300,
    };
  }
  handelSubmit = (event) => {
    event.preventDefault()
    const value = event.target.elements.cclinkanswer.value
    console.log(value)
  }
  //
  // handleChange = (event) => {
  //   const {value} = event.target
  //   this.setState({
  //     error : this.props.getErrorMessage(value)
  //   })
  // }
  //
  // componentDidMount(){
  //   this.setState({
  //     error : this.props.getErrorMessage("")
  //   })
  // }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState }});
  }

  render() {
    const {error} = this.state;
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
                    <br/>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12">
                    <form onSubmit={this.handelSubmit}>
                      <Input type="text" name="cclinkanswer" placeholder="Enter Link Github" required />
                      <br/>
                      <Button color="primary" type="submit" >Submit</Button>
                    </form>
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
