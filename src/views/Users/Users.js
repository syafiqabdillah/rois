import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button, Card, CardBody, CardHeader, Col, Row} from 'reactstrap';
import { MDBDataTable } from 'mdbreact';
import Modals from './Modals';

const API = 'http://localhost:8000';

const data = {
  columns: [
    {
      label: "Name",
      field: 'name',
      sort: 'asc',
    },
    {
      label: "Username",
      field: 'username',
      sort: 'asc',
    },
    {
      label: "Role",
      field: 'role',
      sort: 'asc',
    },
    {
      label: "Division",
      field: 'divisi',
      sort: 'asc',
    },
    {
      label: "Action",
      field: 'action',
      sort: 'disabled'
    }
  ],
  rows: []
}

class Users extends Component {
  constructor(props){
    super(props);
    this.state = {
      users: [],
      loading: true,
      modals : false,
    }
  }

  onClick (user){
    localStorage.setItem('user', JSON.stringify(user));
    window.location.href = '#/updateUser/' + user.id;
  }

  componentDidMount(){
    axios.get(API + '/sysadmin/all-users')
    .then(res => {
      const users = res.data;
      this.setState({
        users: users,
        loading: false
      })
    })
  }

  render() {
    let content;

    if (this.state.loading){
      content = <div align="center"><p>Loading . . .</p></div>;
    } else {
      let list_soal = this.state.users.map((user) => {
        return (
          {
            name: user.name,
                        
            username: user.username,  
            
            role: user.role,

            divisi: user.divisi,
            
            action: 
            <div style={{width:110, overflow: 'hidden'}}>
              <Row>
                <Col>
                  <Button color="primary" onClick={() => this.onClick(user)} className=" btn btn-primary btn-pill">
                    <i className="cui-pencil icons"></i>
                  </Button>
                    
                </Col>
                <Col>
                  <Modals name={user.name} id={user.id} />
                </Col>
              </Row>
            </div>
          }
        );
      });
      
      data.rows = []
      for (var i = 0; i < list_soal.length; i++) {
        data.rows.push(list_soal[i]);
      }

      content = (
        <MDBDataTable borderless
                      striped
                      hover 
                      small 
                      btn
                      data={data} />
      );
    }

    return (
      <div className="animated fadeIn">
        <div align="center">
          <h3>User Management</h3>
        </div>
        <br></br>
        <Link to="/addUser">
            <Button color="primary" className="btn-pill">Add User</Button>
        </Link>
        <br></br>
        <br></br>
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> User List
              </CardHeader>
              <CardBody>
                {content}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Users;
