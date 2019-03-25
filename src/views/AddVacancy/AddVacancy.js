import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
//import axios from 'axios';
import { Button, Card, CardBody,
  Form, FormGroup, Input, Label} from 'reactstrap';

class AddVacancy extends Component {

  render() {

    return (
      <div className="animated fadeIn">
        <div align="center">
          <h3 font-family="Metropolis">Add Vacancy</h3>
        </div>
        <Card>
          <CardBody>

          <Form action="" method="post" size="sm">

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

            <Button color="primary">Submit</Button>
          </Form>

          </CardBody>
        </Card>
      </div>
    );
  }
}

export default AddVacancy;
