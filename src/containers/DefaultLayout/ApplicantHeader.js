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

    let profile = JSON.parse(localStorage.getItem('profile'));
    let imageUrl = profile.imageUrl;

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

        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <Link to="/" className="nav-link" >Home</Link>
          </NavItem>
          <NavItem className="px-3">
            <Link to="/" className="nav-link">Profile</Link>
          </NavItem>
          <NavItem className="px-3">
            <Link to="/" className="nav-link">My Applications</Link>
          </NavItem>

        </Nav>
        <Nav className="ml-auto" navbar>
          <NavItem className="d-md-down-none">
            <NavLink href="#"><i className="icon-bell"></i><Badge pill color="danger">5</Badge></NavLink>
          </NavItem>
          <NavItem className="d-md-down-none">
            <NavLink href="#"><i className="icon-list"></i></NavLink>
          </NavItem>
          <NavItem className="d-md-down-none">
            <NavLink href="#"><i className="icon-location-pin"></i></NavLink>
          </NavItem>
          <AppHeaderDropdown direction="down">
            <DropdownToggle nav>
              <img src={imageUrl} className="img-avatar" alt="admin@bootstrapmaster.com" />
            </DropdownToggle>
            <DropdownMenu right style={{ right: 'auto' }}>
              <DropdownItem><i className="fa fa-user"></i> Profile</DropdownItem>

              <DropdownItem onClick={e => this.props.onLogout(e)}><i className="fa fa-lock"></i> Logout</DropdownItem>
              
            </DropdownMenu>
          </AppHeaderDropdown>
        </Nav>
        <AppAsideToggler className="d-md-down-none" />
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

ApplicantHeader.propTypes = propTypes;
ApplicantHeader.defaultProps = defaultProps;

export default (ApplicantHeader);
