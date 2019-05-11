import React from 'react';
import { Redirect } from 'react-router-dom';

import 'antd/dist/antd.css';
import { Form, Col, Row } from 'antd';
import EmployeePerformanceReport from './EmployeePerformanceReport';


export default class Report extends React.Component{
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

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState }});
  }

  render() {
    return (
      <div className="animated fadeIn">
        <EmployeePerformanceReport employeeid={this.props.match.params.id}/>
      </div>
      );
    }
}
