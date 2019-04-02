import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Container, Button, Card, CardBody, FormText, Row, Col, Form, FormGroup, Input, Label } from 'reactstrap';
import axios from 'axios';

class ApplicationForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id_lowongan: '',
      loading: true,
      nama_lowongan: '',
      skill: '',
      experience: '',
      expectedSalary: 0,
      coverLetter: '',
      file: null,
      modal: false,
      commit: false
    }
  }

  handleInputChange = (e) => {
    e.preventDefault()
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleInputFile = (e) => {
    this.setState({
      file: e.target.files[0]
    })
  }

  fileUpload = () => {
    const url = 'http://localhost:8000/pelamar/upload-cv';

    const formData = new FormData();
    formData.append('file', this.state.file)
    formData.append('token', localStorage.getItem('token'));
    formData.append('id_lowongan', localStorage.getItem('id_lowongan'));

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }

    axios.post(url, formData, config)
      .then(function (response) {
        console.log(response.data);
      });
  }

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  handleSubmit = () => {
    // axios post 
    var qs = require('qs');
    //post it to backend
    axios.post('http://localhost:8000/pelamar/create-lamaran', qs.stringify({
      'id_lowongan': localStorage.getItem('id_lowongan'),
      'token_pelamar': localStorage.getItem('token'),
      'salary_expectation': this.state.expectedSalary,
      'cover_letter': this.state.coverLetter,
      'skill': this.state.skill,
      'experience': this.state.experience,
    }),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
      .then(function (response) {
        console.log(response.data);
      })
    //upload cv nya 
    this.fileUpload();

    window.location.href = '#/myapplications'
    window.location.reload()
  }

  componentDidMount() {
    let id_lowongan = localStorage.getItem('id_lowongan');
    axios.get('http://localhost:8000/po/lowongan/' + id_lowongan)
      .then(res => {
        const lowongan = res.data;
        this.setState({
          id_lowongan: lowongan.id,
          loading: false,
          nama_lowongan: lowongan.nama
        })
      })
    console.log(this.state)
  }


  render() {

    return (
      <div className="animated fadeIn">
        <div align="center">
          <h3 fontFamily="Metropolis">Application Form</h3>
          <h3 fontFamily="Metropolis">{this.state.nama_lowongan}</h3>
        </div>

        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card>
                <CardBody>
                  <Form>
                    <FormGroup>
                      <Label htmlFor="skill">Skill*</Label>
                      <Input type="text" id="skill" name="skill" placeholder="Separate with comma" autoComplete="skill" onChange={this.handleInputChange} />
                      <FormText color="muted">
                        eg. Python, Broadcasting, etc.
                      </FormText>
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="experience">Experience*</Label>
                      <Input type="text" id="experience" name="experience" placeholder="Separate with comma" autoComplete="experience" onChange={this.handleInputChange} />
                      <FormText color="muted">
                        eg. UI/UX Researcher 2014-2015, Backend Developer 2010-2013
                      </FormText>
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="expectedSalary">Expected Salary(Rp)*</Label>
                      <Input type="number" id="expectedSalary" name="expectedSalary" autoComplete="expected-salary" onChange={this.handleInputChange} />
                    </FormGroup>

                    <FormGroup>
                      <Label for="file">CV/Resume*</Label>
                      <Input type="file" onChange={this.handleInputFile} />
                      <FormText color="muted">
                        File size should be less than 2MB.
                      </FormText>
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="coverLetter">Why Should We Hire You ?*</Label>
                      <Input type="text" id="coverLetter" name="coverLetter" placeholder="" onChange={this.handleInputChange} />
                    </FormGroup>

                    <div align="center">
                      <Button color="primary" size="lg" className="btn-pill" onClick={this.toggle} block>Submit</Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>

        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Confirmation</ModalHeader>
          <ModalBody>
            <h4>Are you sure that you have entered the correct data?</h4>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" size="lg" onClick={this.handleSubmit} className="btn-pill" block>Yes, I'm sure</Button>
            <Button color="danger" size="lg"onClick={this.toggle} className="btn-pill" block>Cancel</Button>
          </ModalFooter>
        </Modal>

      </div>
    );
  }
}

export default ApplicationForm;
