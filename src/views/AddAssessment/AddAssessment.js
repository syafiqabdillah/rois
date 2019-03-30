import React, { Component } from 'react';
import axios from 'axios';
import { Button, Card, CardBody, Form, FormGroup, Input, Label} from 'reactstrap';

class AddAssessment extends Component {
  constructor(props){
    super(props);

    this.state = {
      lowongan: []
    }
  }

  componentDidMount(){
    axios.get('http://localhost:8000/po/all-lowongan')
    .then(res => {
      const lowongan = res.data;
      this.setState({lowongan})
    })
  }

  render() {
    let list_vacancy = this.state.lowongan.map((lowongan, index) => {
      return (
        <option key={index} value={lowongan.nama}>{lowongan.nama}</option>
      );
    });
    
    return (
      <div className="animated fadeIn">
        <div align="center">
          <h3 fontFamily="Metropolis">Add Assessment</h3>
        </div>
        <Card>
          <CardBody>

          <Form action="" method="post" size="sm">

            <FormGroup>
              <Label htmlFor="nf-email">Name*</Label>
              <Input type="text" id="nf-email" name="nf-email" placeholder="Enter Assessment Name.." autoComplete="email"/>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="ccmonth">Vacancy*</Label>
              <Input type="select" name="ccmonth" id="ccmonth" required> 
                <option disabled>Select Vacancy..</option>
                {list_vacancy}
              </Input>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="nf-password">Assessment Link*</Label>
              <Input type="text" id="nf-password" name="nf-password" placeholder="Enter Location.." autoComplete="current-password"/>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="nf-password">Assessment File*</Label>
              <Input type="text" id="nf-password" name="nf-password" placeholder="Enter Location.." autoComplete="current-password"/>
            </FormGroup>

            <Button color="primary">Submit</Button>
          </Form>

          </CardBody>
        </Card>
      </div>
    );
  }
}

export default AddAssessment;
