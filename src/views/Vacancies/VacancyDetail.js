import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button, CardBody, Col, Card, Row } from 'reactstrap';
import ModalDelete from './ModalDelete';

const API = 'http://localhost:8000';


class VacancyDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lowongan: [],
      related_low: [],
      deskripsi: '',
      loading: true,
      link_post: "",
      info_res: false,
      info_req: false,
      danger: false
    };
    this.toggleInfoRes = this.toggleInfoRes.bind(this);
    this.toggleInfoReq = this.toggleInfoReq.bind(this);
    this.toggleDanger = this.toggleDanger.bind(this);
  }


  componentDidMount() {
    axios.all([
      axios.get(API + '/po/lowongan/' + this.props.match.params.id),
      axios.get(API + '/po/lowongan/related/' + this.props.match.params.id)
    ])
      .then(axios.spread((lowonganres, relatedres) => {
        // do something with both responses
        const lowongan = lowonganres.data;
        const related_lowongan = relatedres.data;
        this.setState({
          lowongan: lowongan,
          related_low: related_lowongan,
          loading: false
        })
      }));
  }

  toggleInfoRes() {
    this.setState({
      info_res: !this.state.info_res,
    });
  }

  toggleInfoReq() {
    this.setState({
      info_req: !this.state.info_req,
    });
  }

  toggleDanger() {
    this.setState({
      danger: !this.state.danger,
    });
  }


  handleApply = () => {
    const id_lowongan = localStorage.getItem('id_lowongan');
    window.location.href = '#/apply/' + id_lowongan;
  }

  // handle delete
  handleDelete = (event) => {
    event.preventDefault()
    var qs = require('qs');
    axios.post(process.env.API_HOST + 'po/delete-lowongan', qs.stringify({
      'id': this.props.match.params.id,
    }),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error.response)
      });

    let redirect = '#/vacancies';
    window.location.href = redirect;
  }


  handleSubmit = (event) => {
    event.preventDefault()
    var qs = require('qs');
    axios.post(this.state.link_post, qs.stringify({
      'id_lowongan': this.props.match.params.id,
      'deskripsi': this.state.deskripsi
    }),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error.response)
      });
    let redirect = '#/vacancies';
    window.location.href = redirect;
  }


  handleChange = (event) => {

    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value,
      link_post: process.env.API_HOST + 'po/create-' + event.target.id
    })

  }

  handleOnClick(id) {
    let id_lowongan = id;
    localStorage.setItem('id_lowongan', id_lowongan);
    window.location.href = '#/apply/' + id_lowongan;
  }



  render() {
    let content_vacancy;
    let content_other;
    let content_related;

    let content_button_edit;
    let content_button_delete;
    let content_button_apply;

    let formAddResponsibilities;
    let formAddRequirement;

    let isDirujuk = this.state.lowongan.isDirujuk;
    let id = this.state.lowongan.id;
    let name = this.state.nama;

    if (this.state.loading) {
      return (<div align="center"><p>Loading . . .</p></div>);
    } else {
      let lowongan = this.state.lowongan;
      localStorage.setItem('id_lowongan', lowongan.id);

      let requirements = lowongan.requirement.map((requirement, index) => {
        return (
          <li key={index}>{requirement.deskripsi}</li>
        );
      });


      let responsibilities = lowongan.responsibility.map((responsibility, index) => {
        return (
          <li key={index}>{responsibility.deskripsi}</li>
        );
      });


      let rltd_lwngn = this.state.related_low.map((related, index) => {
        return (
          <li key={index}><Link to={"/vacancy/" + related.id} >{related.nama}</Link></li>
        );


      });

      //kalau pelamar, ada button apply
      if (localStorage.getItem('role') === 'pelamar') {
        content_button_apply = (
          <div align="center">
            <Button color="primary" size="lg" className="btn-pill" onClick={this.handleApply}>APPLY NOW</Button>
          </div>
        );
      }

      let apply_button;
      if(localStorage.getItem.role !== "PELAMAR"){
        apply_button = ''
      } else {
        apply_button = (
          <div align="center">
            <Button color="primary" size="lg" className="btn-pill" onClick={() => this.handleOnClick(lowongan.id)}>APPLY NOW</Button>
          </div>
        )
      }

      content_vacancy = (
        <div>
          <dl>
            <h2 className="col-sm-10">{lowongan.nama}</h2>
            <br></br>
            <h5>Position Available: {lowongan.posisi_tersedia}</h5>
            <br></br>
            <div>
              <h5>Requirements</h5>
              {requirements}
            </div>

            <br></br>
            <br></br>

            <div>
              <h5>Responsibilities</h5>
              {responsibilities}
            </div>

            {content_button_apply}
          </dl>

          { apply_button }
        </div>

      );

      content_other = (
        <div className="bd-example">
          <dl className="row">

            <dt className="col-sm-6">
              <i align="center" className="cui-location-pin icons font-2xl d-block "></i>
              <div align="center">Location</div>
            </dt>
            <dd className="col-sm-6">
              <p className="mt-4">{lowongan.lokasi}</p>
            </dd>


            <dt className="col-sm-6">
              <i align="center" className="cui-briefcase icons font-2xl d-block"></i>
              <div align="center"> Job Type </div>
            </dt>
            <dd className="col-sm-6">
              <p className="mt-4">{lowongan.tipe}</p>
            </dd>

            <dt className="col-sm-6">
              <i align="center" className="cui-calendar icons font-2xl d-block "></i>
              <div align="center"> Application Deadline</div>
            </dt>
            <dd className="col-sm-6">
              <p className="mt-4">{lowongan.end_date}</p>
            </dd>

          </dl>
        </div>

      )

      content_related = (
        <div>
          <h4>Related Jobs</h4>
          {rltd_lwngn}
        </div>
      )

      if (localStorage.getItem('role') !== 'pelamar') {
        content_button_edit = (
          <Link to={"/vacancy/update/" + lowongan.id} >
            <Button className="btn-pill" color="primary">Edit Vacancy</Button>
          </Link>


        )
        content_button_delete = (
          <ModalDelete isDirujuk={isDirujuk} name={name} id={id} />

        )
      }
    }

    let buttonAddResAddReq;
    if (localStorage.getItem('role') !== 'pelamar') {
      buttonAddResAddReq = (''
        // <Row>
        //   <Button color="info" onClick={this.toggleInfoRes} className="mr-1 btn-pill" color="primary">Add Responsibility</Button>
        //   <Button color="info" onClick={this.toggleInfoReq} className="mr-1 btn-pill" color="primary">Add Requirement</Button>
        // </Row>
      );
    } else {
      buttonAddResAddReq = '';
    }

    let edit_delete_po;
    if (localStorage.getItem('role') !== 'PELAMAR') {
      edit_delete_po = (
        <Row>
          {content_button_edit}
          &nbsp;&nbsp;&nbsp;
          {content_button_delete}
        </Row>
      )
    } else {
      edit_delete_po = '';
    }

    return (
      <div className="animated fadeIn">
        {edit_delete_po}

        <br></br>
        <Row>
          <Col sm="8">
            <Col mb="4">
              <Card>
                <CardBody>
                  {content_vacancy}
                </CardBody>
              </Card>
            </Col>


            <div>
              {buttonAddResAddReq}
              {formAddResponsibilities}
              {formAddRequirement}
            </div>
          </Col>


          <Col sm="4">
            <Col mb="4">
              <Card>
                <CardBody>
                  {content_other}
                </CardBody>
              </Card>
            </Col>

            <Col mb="4">
              <Card>
                <CardBody>
                  {content_related}
                </CardBody>
              </Card>
            </Col>
          </Col>

        </Row>
      </div>


    );
  }
}

export default VacancyDetail;
