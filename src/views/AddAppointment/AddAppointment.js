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

class AddAppointment extends React.Component{
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
                <strong>Add Appointment</strong>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs="5">
                    <FormGroup>
                      <Label htmlFor="ccdate">Date</Label>
                      <Input type="date" name="ccdate" id="ccdate">
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col xs="3">
                    <FormGroup>
                      <Label htmlFor="ccstart">Start Time</Label>
                      <Input type="time" name="ccstart" id="ccstart">
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col xs="3">
                    <FormGroup>
                      <Label htmlFor="ccfinish">Finish Time</Label>
                      <Input type="time" name="ccfinish" id="ccfinish"/>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="cclocation">Location</Label>
                      <Input type="text" id="cclocation" placeholder="Enter Location" required />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="selectInterviewer">Interviewer</Label>
                      <Input type="select" name="selectInterviewer" id="selectInterviewer">
                        <option value="0">Please select</option>
                        <option value="1">John Doe</option>
                        <option value="2">Andrew NG</option>
                        <option value="3">Steve Job</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="4">
                  </Col>
                  <Col xs="4">
                  </Col>
                  <Col xs="4">
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

export default AddAppointment;
