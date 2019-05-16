import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

import 'antd/dist/antd.css';
import { Card, Col, Row } from 'antd';

class ChooseStages extends Component {
  constructor(props){
    super(props);

    this.state = {
      loading: true
    }
  }

  componentDidMount(){
    this.setState({
      loading: false
    })
  }

  render() {
    let content;

    if (this.state.loading){
      content = <div align="center"><p>Loading . . .</p></div>;
    } else {
      content = (
        <div >
          <Row type="flex" justify="center">
            <p>This applicant is currently <strong>not assigned to anything.</strong> Please choose the next step for this applicant to take: </p>
          </Row>
          <Row type="flex" justify="center">
            <Col span={7} style={{ margin: 5 }}>
              <Link to={"/addappointment/" + this.props.lamaran.id}> <Button className="btn-pill" color="primary"  block>Interview</Button> </Link>
            </Col>
            <Col span={7} style={{ margin: 5 }}>
              <Link to={"/remoteTest/" + this.props.lamaran.id}> <Button className="btn-pill" color="info"  block>Remote Test</Button> </Link>
            </Col>
            <Col span={7} style={{ margin: 5 }}>
              <Link to={"/hire/" + this.props.lamaran.id}> <Button outline className="btn-pill" color="success"  block>Hire</Button> </Link>
            </Col>
          </Row>
        </div>
      );
    }

    return (
      <div className="animated fadeIn">
        <Card hoverable loading={this.state.loading}>
          {content}
        </Card>
      </div>
    );
  }
}

export default ChooseStages;
