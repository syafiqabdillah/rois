import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Vacancies } from './Vacancies';
import { Button, Badge, Card, CardTitle, CardDeck, CardText, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';

const API = 'http://localhost:8000';


class VacancyDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
      lowongan: [],
      related_low:[],
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
        loading:false

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

  render() {
    let content;
    let content_vacancy;
    let content_other;
    let content_related;
   
    if (this.state.loading) {
      content = <div align="center"><p>Loading . . .</p></div>;
    } else {
      let lowongan = this.state.lowongan;
      
      let requirements = lowongan.requirement.map((requirement) =>{
        return(
          <li>{requirement.deskripsi}</li>
        );
      });

       let responsibilities = lowongan.responsibility.map((responsibility) =>{
         return(
           <li>{responsibility.deskripsi}</li>
         );
        });


         let rltd_lwngn =this.state.related_low.map((related) =>{
          return(
            <li><Link to ={"/vacancy/"+ lowongan.id} >{lowongan.nama}</Link></li>
          );
 

       });



      content_vacancy= (
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

      content_related =(
        <div>
        <h4>Related Jobs</h4>
        {rltd_lwngn}
        </div>


      )
    }


    return (
      <div className="animated fadeIn">
        <div class="row">
        <div class = "col-12">
        <Link to="/editVacancy">
            <Button className="btn-pill" color="primary">Edit Vacancy</Button>
          </Link>
          <Link to="/deleteVacancy">
            <Button className="btn-pill" align="right" color="danger">Delete Vacancy</Button>
          </Link>
          
        </div>
        <br></br>
        <br></br>
        <br></br>
          <div class="col-8">
            <div class="card mb-4">
              <CardBody>
                {content_vacancy}
              </CardBody>
            </div>
          </div>
          <div class="col-4">
            <div class="card mb-4">
              <CardBody>
                {content_other}
              </CardBody>
            </div>
            <div class="card mb-4">
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
