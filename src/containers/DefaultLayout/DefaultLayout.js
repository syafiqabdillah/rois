import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container, Spinner } from 'reactstrap';

import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_nav';
import navigationPelamar from '../../_nav_pelamar';
import navigationSysAdmin from '../../_nav_sys_admin';
import navigationSupervisor from '../../_nav_supervisor';
import navigationKaryawanOnboarding from '../../_nav_karyawan_onboarding';
// routes config

import routes from '../../routes';
import KaryawanOnboardingHeader from './KaryawanOnboardingHeader';

const DefaultAside = React.lazy(() => import('./DefaultAside'));
const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));
const ApplicantHeader = React.lazy(() => import('./ApplicantHeader'));
const SysAdminHeader = React.lazy(() => import('./SysAdminHeader'));
const SupervisorHeader = React.lazy(() => import('./SupervisorHeader'));

class DefaultLayout extends Component {

  loading = () => <div align="center"><Spinner color="primary" style={{ width: '3rem', height: '3rem' }} /></div>

  signOut(e) {
    e.preventDefault()
    this.props.history.push('/login');
    localStorage.clear();
  }

  render() {
    //kalau belum ada token -> belum login
    if (!localStorage.hasOwnProperty('token')) {
      //diminta login
      return <Redirect to="/login" />
    }

    let header;
    let sidebar;
    let home;

    let id_karyawan = localStorage.getItem('id_karyawan')

    //jika pelamar
    if (localStorage.getItem('role') === 'PELAMAR') {
      //header pelamar
      header = (<ApplicantHeader onLogout={e => this.signOut(e)} />);
      //sidebar pelamar
      sidebar = ''
      sidebar = (
        <AppSidebar fixed isOpen={false} display="lg">
          <AppSidebarHeader />
          <AppSidebarForm />
          <Suspense>
            <AppSidebarNav navConfig={navigationPelamar} {...this.props} />
          </Suspense>
          <AppSidebarFooter />
          <AppSidebarMinimizer />
        </AppSidebar>
      );
      //redirect home pelamar
      home = (<Redirect from='/' to="/vacancies-applicant" />);
    } else if (localStorage.getItem('role') === 'PEOPLE OPS'){
      //header admin po
      header = <DefaultHeader onLogout={e => this.signOut(e)} />;
      //sidebar admin po
      sidebar = (
        <AppSidebar fixed display="lg" isOpen={false}>
          <AppSidebarHeader />
          <AppSidebarForm />
          <Suspense>
            <AppSidebarNav navConfig={navigation} {...this.props} />
          </Suspense>
          <AppSidebarFooter />
          <AppSidebarMinimizer />
        </AppSidebar>
      )
      //redirect admin po
      home = (<Redirect from="/" to="/dashboard" />);
    } else if (localStorage.getItem('role') === 'KARYAWAN ONBOARDING'){
      //header admin po
      header = <KaryawanOnboardingHeader onLogout={e => this.signOut(e)} />;
      //sidebar admin po
      sidebar = (
        <AppSidebar fixed display="lg" isOpen={false}>
          <AppSidebarHeader />
          <AppSidebarForm />
          <Suspense>
            <AppSidebarNav navConfig={navigationKaryawanOnboarding} {...this.props} />
          </Suspense>
          <AppSidebarFooter />
          <AppSidebarMinimizer />
        </AppSidebar>
      )
      //redirect admin po
      var qwe = "/taskskaryawan/" + id_karyawan
      home = (<Redirect from="/" to={qwe} />);
    } else if (localStorage.getItem('role') === 'SUPERVISOR'){
      //header admin po
      header = <SupervisorHeader onLogout={e => this.signOut(e)} />;
      //sidebar admin po
      sidebar = (
        <AppSidebar fixed display="lg" isOpen={false}>
          <AppSidebarHeader />
          <AppSidebarForm />
          <Suspense>
            <AppSidebarNav navConfig={navigationSupervisor} {...this.props} />
          </Suspense>
          <AppSidebarFooter />
          <AppSidebarMinimizer />
        </AppSidebar>
      )
      //redirect admin po
      home = (<Redirect from="/" to="/employees" />);
    } else if (localStorage.getItem('role') === 'SYSTEM ADMIN'){
      //header admin po
      header = <SysAdminHeader onLogout={e => this.signOut(e)} />;
      //sidebar admin po
      sidebar = (
        <AppSidebar fixed display="lg" isOpen={false}>
          <AppSidebarHeader />
          <AppSidebarForm />
          <Suspense>
            <AppSidebarNav navConfig={navigationSysAdmin} {...this.props} />
          </Suspense>
          <AppSidebarFooter />
          <AppSidebarMinimizer />
        </AppSidebar>
      )
      //redirect sys admin
      home = (<Redirect from="/" to="/users" />);
    }

    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense fallback={this.loading()}>

            {header}

          </Suspense>
        </AppHeader>
        <div className="app-body">

          {sidebar}

          <main className="main">
            <AppBreadcrumb appRoutes={routes} />
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => (
                          <route.component {...props} />
                        )} />
                    ) : (null);
                  })}

                  {home}

                </Switch>
              </Suspense>
            </Container>
          </main>
          <AppAside fixed>
            <Suspense fallback={this.loading()}>
              <DefaultAside />
            </Suspense>
          </AppAside>
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

export default DefaultLayout;
