import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button,  Badge, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink } from 'reactstrap';
import PropTypes from 'prop-types';
import GoogleLogin from 'react-google-login';

import { AppAsideToggler, AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import sirclo from '../../assets/img/brand/sirclo.png'
import sygnet from '../../assets/img/brand/sygnet.svg'

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class ApplicantHeader extends Component {

  responseGoogle = (response) => {
    let profile = response.profileObj;
    console.log(profile);
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    const buttonLoggedIn = (
      <Nav className="ml-auto" navbar>
        <NavItem className="d-md-down-none">
          <Link to="/logout" className="nav-link">Logout</Link>
        </NavItem>
      </Nav>
    );

    const buttonLoggedOut = (
      <Nav className="ml-auto" navbar>
        <NavItem className="d-md-down-none">
          <Link to="/" className="nav-link">Login</Link>
        </NavItem>
        <NavItem>
          <GoogleLogin
            clientId="814213310620-0arq20th3kurnr37u7srv6hn3fiubj99.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
          />
        </NavItem>
      </Nav>
    );

    const menuLoggedIn = (
      <Nav className="d-md-down-none" navbar>
        <NavItem className="px-3">
          <Link to="/" className="nav-link" >Home</Link>
        </NavItem>
        <NavItem className="px-3">
          <Link to="/pelamar/" className="nav-link">Profile</Link>
        </NavItem>
      </Nav>
    );


    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: sirclo, width: 89, height: 35, alt: 'SIRCLO Logo' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'SIRCLO Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        { isAuthenticated ? menuLoggedIn : <div></div> }

        { isAuthenticated ? buttonLoggedIn : buttonLoggedOut }

      </React.Fragment>
    );
  }
}

ApplicantHeader.propTypes = {
  auth: React.PropTypes.object.isRequired
};
ApplicantHeader.defaultProps = defaultProps;

export default (ApplicantHeader);
