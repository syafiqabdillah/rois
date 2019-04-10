import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, Container, Button, Card, CardBody, FormText, Row, Col, Form, FormGroup, Input, Label } from 'reactstrap';
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
    let size = e.target.files[0].size / 1024 / 1024;
    if (size < 2) {
      this.setState({
        file: e.target.files[0]
      })
    } else {
      alert('file size must be less than 2 MB')
      e.target.value = ""
    }
  }

  fileUpload = () => {

    const url = 'http://localhost:8000/pelamar/upload-cv';

    const formData = new FormData();
    formData.append('file', this.state.file)
    formData.append('id_lamaran', localStorage.getItem('id_lamaran'));

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }

    axios.post(url, formData, config)
      .then(function (response) {
        console.log(response.data);
        // redirect sambil nunggu cvnya diupload
        // window.location.href = '#/myapplications'
        // window.location.reload()
        window.alert("Your Application Has Been Successfully Submitted !")
      })
  }

  toggle = (e) => {
    e.preventDefault()
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  handleSubmit = (e) => {
    this.toggle(e);

    // axios post
    const url = 'http://localhost:8000/pelamar/create-lamaran'

    const formData = new FormData();
    formData.append('token_pelamar', localStorage.getItem('token'))
    formData.append('id_lowongan', localStorage.getItem('id_lowongan'))
    formData.append('salary_expectation', this.state.expectedSalary)
    formData.append('cover_letter', this.state.coverLetter)
    formData.append('skill', this.state.skill,)
    formData.append('experience', this.state.experience)
    formData.append('file', this.state.file)

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }

    axios.post(url, formData, config)
      .then(function (response) {
        console.log(response.data)

        // window.location.href = '#/myapplications'
        // window.location.reload()
        window.alert("Your Application Has Been Successfully Submitted !")
      })
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
                  <Form onSubmit={this.toggle}>
                    <FormGroup>
                      <Label htmlFor="skill">Skill*</Label>
                      <Input required type="text" id="skill" name="skill" placeholder="Separate with comma" autoComplete="skill" onChange={this.handleInputChange} />
                      <FormText color="muted">
                        eg. Python, Broadcasting, etc.
                      </FormText>
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="experience">Experience*</Label>
                      <Input required type="text" id="experience" name="experience" placeholder="Separate with comma" autoComplete="experience" onChange={this.handleInputChange} />
                      <FormText color="muted">
                        eg. UI/UX Researcher 2014-2015, Backend Developer 2010-2013
                      </FormText>
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="expectedSalary">Expected Salary(Rp)*</Label>
                      <Input required type="number" id="expectedSalary" name="expectedSalary" autoComplete="expected-salary" onChange={this.handleInputChange} />
                    </FormGroup>

                    <FormGroup>
                      <Label for="file">CV/Resume*</Label>
                      <Input required type="file" onChange={this.handleInputFile} />
                      <FormText color="muted">
                        File size should be less than 2MB.
                      </FormText>
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="coverLetter">Tell Us Something About You *</Label>
                      <Input required type="text" id="coverLetter" name="coverLetter" placeholder="" onChange={this.handleInputChange} />
                    </FormGroup>

                    <div align="right">
                      <Button color="primary" size="lg" className="btn-pill" >Submit</Button>
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
            <Row>
              <Col xs="6" sm="2"></Col>
              <Col xs="6" sm="8">
                <h4><strong>Are you sure you have entered correct data ?</strong></h4>
              </Col>
              <Col sm="2"></Col>
            </Row>
            <Row>
              <Col xs="6" sm="2"></Col>
              <Col xs="6" sm="8">
                <Button color="primary" size="lg" onClick={this.handleSubmit} className="btn-pill" block>Yes, I'm sure</Button>
              </Col>
              <Col sm="2"></Col>
            </Row>
            <br />
            <Row>
              <Col xs="6" sm="2"></Col>
              <Col xs="6" sm="8">
                <Button color="danger" size="lg" onClick={this.toggle} className="btn-pill" block>Cancel</Button>
              </Col>
              <Col sm="2"></Col>
            </Row>
            <br />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default ApplicationForm;
