import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import sirclo from '../../assets/img/brand/sirclo.png'

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class KaryawanOnboardingHeader extends Component {

  responseGoogle = (response) => {
    let profile = response.profileObj;
    console.log(profile);
  }

  render() {

    let imageUrl = 'https://cdn0.iconfinder.com/data/icons/elasto-online-store/26/00-ELASTOFONT-STORE-READY_user-circle-512.png';

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: sirclo, width: 89, height: 35, alt: 'SIRCLO Logo' }}
          minimized={{ src: sirclo, width: 44, height: 17, alt: 'SIRCLO Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <Link to="/" className="nav-link" >My Task</Link>
          </NavItem>

        </Nav>
        <Nav className="ml-auto" navbar>
          <NavItem className="px-3">
            <Link to="#" onClick={e => this.props.onLogout(e)} className="nav-link">Logout</Link>
          </NavItem>
          {/* <AppHeaderDropdown direction="down">
            <DropdownToggle nav>
              <img src={imageUrl} className="img-avatar" alt="admin@bootstrapmaster.com" />
            </DropdownToggle>
            <DropdownMenu right style={{ right: 'auto' }}>
              <DropdownItem onClick={this.toProfile}><i className="fa fa-user"></i>Profile</DropdownItem>
              <DropdownItem onClick={e => this.props.onLogout(e)}><i className="fa fa-lock"></i> Logout</DropdownItem>
            </DropdownMenu>
          </AppHeaderDropdown> */}
        </Nav>
      </React.Fragment>
    );
  }
}

KaryawanOnboardingHeader.propTypes = propTypes;
KaryawanOnboardingHeader.defaultProps = defaultProps;

export default (KaryawanOnboardingHeader);
