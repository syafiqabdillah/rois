import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Input,
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
    };
  }
  handelSubmit = (event) => {
    event.preventDefault()
    const value = event.target.elements.cclinkanswer.value
    if(!this.getErrorMessage()){
        this.showModals();
    }
  }

  showModals = () =>{
    this.setState({
      modals : true
    })
  }

  //
  handleChange = (event) => {
    const {value} = event.target
    this.setState({
      error : this.getErrorMessage(value)
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
    const {error} = this.state;
    console.log(error);
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
                    <CountDown date={`2019-3-28`}/>
                    <br/>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12">
                    <form>
                      <Input type="text" onChange={this.handleChange} name="cclinkanswer" placeholder="Enter Link Github" required />
                      <br/>
                    </form>
                    <Modals error={error} />
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
