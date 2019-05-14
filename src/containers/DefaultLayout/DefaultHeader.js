import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppAsideToggler, AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import sirclo from '../../assets/img/brand/sirclo.png'
import logo from '../../assets/img/brand/logo.svg'

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

let imageUrl;
if (localStorage.getItem('profile') != undefined) {
  const profile = JSON.parse(localStorage.getItem('profile'));
  imageUrl = profile.imageUrl;
} else {
  imageUrl = 'https://cdn0.iconfinder.com/data/icons/elasto-online-store/26/00-ELASTOFONT-STORE-READY_user-circle-512.png';
}

class DefaultHeader extends Component {
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

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
            <Link to="/" className="nav-link" >Dashboard</Link>
          </NavItem>
          <NavItem className="px-3">
            <Link to="/vacancies" className="nav-link">Vacancies</Link>
          </NavItem>
          <NavItem className="px-3">
            <Link to="/applications" className="nav-link">Applications</Link>
          </NavItem>

          <NavItem className="px-3">
            <Link to="/assessments" className="nav-link">Assessments</Link>
          </NavItem>

          <NavItem className="px-3">
            <Link to="/appointmens" className="nav-link">Appointments</Link>
          </NavItem>

          <NavItem className="px-3">
            <Link to="/appointmens" className="nav-link">Appointments</Link>
          </NavItem>

        </Nav>
        <Nav className="ml-auto" navbar>

          <AppHeaderDropdown direction="down">

            <DropdownToggle nav>
              <img src={imageUrl} className="img-avatar" alt="admin@bootstrapmaster.com" />
            </DropdownToggle>

            <DropdownMenu right style={{ right: 'auto' }}>


              <DropdownItem onClick={e => this.props.onLogout(e)}><i className="fa fa-lock"></i> Logout</DropdownItem>

            </DropdownMenu>
          </AppHeaderDropdown>
        </Nav>
        
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
