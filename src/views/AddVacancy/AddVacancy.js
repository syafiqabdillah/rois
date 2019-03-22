import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button, Badge, Card, CardBody, CardHeader, Col,
  Form, FormGroup, FormText, Input, Label, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';

const API = 'http://localhost:8000';

class AddVacancy extends Component {
  constructor(props){
    super(props);

  }

  render() {

    return (
      <div>
        <div align="center">
          <h3 font-family="Metropolis">Add Vacancy</h3>
        </div>
        <Card>
          <CardBody>
          <Form action="" method="post">

            <FormGroup>
              <Label htmlFor="nf-email">Name*</Label>
              <Input type="text" id="nf-email" name="nf-email" placeholder="Enter Email.." autoComplete="email"/>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="nf-password">Division*</Label>
              <Input type="text" id="nf-password" name="nf-password" placeholder="Enter Division.." autoComplete="current-password"/>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="nf-password">Location*</Label>
              <Input type="text" id="nf-password" name="nf-password" placeholder="Enter Location.." autoComplete="current-password"/>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="nf-password">Type* </Label>
              <Input type="text" id="nf-password" name="nf-password" placeholder="Enter Type.." autoComplete="current-password"/>
            </FormGroup>

          </Form>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default AddVacancy;
