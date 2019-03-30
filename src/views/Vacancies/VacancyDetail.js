import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button, CardBody} from 'reactstrap';

const API = 'http://localhost:8000';


class VacancyDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {

      lowongan: [],
      related_low: [],
      loading: true
    }
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


    // axios.get(API + '/po/lowongan/' + this.props.match.params.id)
    //   .then(res => {
    //   const lowongan = res.data;
    //    this.setState({
    //     lowongan: lowongan,
    //     loading:false
    //   })
    //  })
    //  let lowongann = this.state.lowongan;
    //  console.log(lowongann.tipe);
    //  console.log(lowongann.divisi);
    // // axios.get(API + '/po/lowongan/'+ this.state.lowongan.divisi+'/'+ this.state.lowongan.tipe)
    // //  .then(res=>{
    // //  const rel_lowongan = res.data;
    // //    this.setState({
    // //      related_lowongan:rel_lowongan,
    // //      loading: false
    // //    })
    // //  })
  }

  handleApply = () => {
    const id_lowongan = localStorage.getItem('id_lowongan');
    window.location.href = '#/apply/' + id_lowongan;
  }

  render() {
    let content_vacancy;
    let content_other;
    let content_related;
    let content_button_edit_delete;
    let content_button_apply;

    if (this.state.loading) {
      return( <div align="center"><p>Loading . . .</p></div>);
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
          <li key={index}><Link to={"/vacancy/" + lowongan.id} >{lowongan.nama}</Link></li>
        );


      });

      //kalau pelamar, ada button apply 
      if (localStorage.getItem('role') === 'pelamar') {
        content_button_apply = (
          <div align="center">
            <Button color="primary" className="btn-pill" onClick={this.handleApply}>APPLY NOW</Button>
          </div>
        );
      }



      content_vacancy = (
        <div>
          <dl>
            <h2 className="col-sm-10">{lowongan.nama}</h2>
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
        </div>

      );

      content_other = (
        <div className="bd-example">
          <dl className="row">

            <dt className="col-sm-4">
              <i align="center" className="cui-location-pin icons font-2xl d-block mt-4"></i>
              <div align="center">Location</div>
            </dt>
            <dd className="col-sm-8">
              <p className="mt-4">{lowongan.lokasi}</p>
            </dd>


            <dt className="col-sm-4">
              <i align="center" className="cui-briefcase icons font-2xl d-block mt-4"></i>
              <div align="center"> Job Type </div>
            </dt>
            <dd className="col-sm-8">
              <p className="mt-4">{lowongan.tipe}</p>
            </dd>

            <dt className="col-sm-4">
              <i align="center" className="cui-calendar icons font-2xl d-block mt-4"></i>
              <div align="center"> Application Deadline</div>
            </dt>
            <dd className="col-sm-8">
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
        content_button_edit_delete = (
          <div className="col-12">
            <Link to="/editVacancy">
              <Button className="btn-pill" color="primary">Edit Vacancy</Button>
            </Link>
            <Link to="/deleteVacancy">
              <Button className="btn-pill" align="right" color="danger">Delete Vacancy</Button>
            </Link>
          </div>
        )
      }
    }

    return (
      <div className="animated fadeIn">
        <div className="row">
          {content_button_edit_delete}
          <br></br>
          <br></br>
          <br></br>
          <div className="col-8">
            <div className="card mb-4">
              <CardBody>
                {content_vacancy}
              </CardBody>
            </div>
          </div>
          <div className="col-4">
            <div className="card mb-4">
              <CardBody>
                {content_other}
              </CardBody>
            </div>
            <div className="card mb-4">
              <CardBody>
                {content_related}
              </CardBody>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default VacancyDetail;