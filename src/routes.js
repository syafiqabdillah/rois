import React from 'react';
import DefaultLayout from './containers/DefaultLayout';

const Breadcrumbs = React.lazy(() => import('./views/Base/Breadcrumbs'));
const Cards = React.lazy(() => import('./views/Base/Cards'));
const Carousels = React.lazy(() => import('./views/Base/Carousels'));
const Collapses = React.lazy(() => import('./views/Base/Collapses'));
const Dropdowns = React.lazy(() => import('./views/Base/Dropdowns'));
const Forms = React.lazy(() => import('./views/Base/Forms'));
const Jumbotrons = React.lazy(() => import('./views/Base/Jumbotrons'));
const ListGroups = React.lazy(() => import('./views/Base/ListGroups'));
const Navbars = React.lazy(() => import('./views/Base/Navbars'));
const Navs = React.lazy(() => import('./views/Base/Navs'));
const Paginations = React.lazy(() => import('./views/Base/Paginations'));
const Popovers = React.lazy(() => import('./views/Base/Popovers'));
const ProgressBar = React.lazy(() => import('./views/Base/ProgressBar'));
const Switches = React.lazy(() => import('./views/Base/Switches'));
const Tables = React.lazy(() => import('./views/Base/Tables'));

const Vacancies = React.lazy(() => import('./views/Vacancies'));
const UpdateVacancy = React.lazy(() => import ('./views/UpdateVacancy/UpdateVacancy'));
const VacancyDetail = React.lazy(() => import('./views/Vacancies/VacancyDetail'));
const Applications = React.lazy(() => import('./views/Applications'));
const Assessments = React.lazy(() => import('./views/Assessments'));
const Appointments = React.lazy(() => import('./views/Appointments'));
const AddAppointment = React.lazy(() => import('./views/AddAppointment'));
const AddAnswer = React.lazy(() => import('./views/AddAnswer'));
const AddVacancy = React.lazy(() => import('./views/AddVacancy'));
const AddAssessment = React.lazy(() => import('./views/AddAssessment'));
const EmployeePerformanceReport = React.lazy(() => import('./views/EmployeePerformanceReport'));
const Employees = React.lazy(() => import('./views/Employee'));
const VacanciesPelamar = React.lazy(() => import('./views/VacanciesPelamar'));
const ApplicationForm = React.lazy(() => import('./views/ApplicationForm'));
const ApplicationsPelamar = React.lazy(() => import('./views/ApplicationsPelamar'));
const Applicants = React.lazy(() => import('./views/Applicants'));
const Hire = React.lazy(() => import('./views/FinalStage'));
const Reject = React.lazy(() => import('./views/FinalStage/Reject'));
const RemoteTest = React.lazy(() => import('./views/RemoteTest'));
const Profile = React.lazy(() => import('./views/Profile'));
const UpdateAssessment = React.lazy(() => import('./views/UpdateAssessment'));
const AddUser = React.lazy(() => import('./views/AddUser'));
const UpdateUser = React.lazy(() => import('./views/UpdateUser'));

const TasksKaryawan = React.lazy(() => import('./views/TasksKaryawan'));

const Tabs = React.lazy(() => import('./views/Base/Tabs'));
const Tooltips = React.lazy(() => import('./views/Base/Tooltips'));
const BrandButtons = React.lazy(() => import('./views/Buttons/BrandButtons'));
const ButtonDropdowns = React.lazy(() => import('./views/Buttons/ButtonDropdowns'));
const ButtonGroups = React.lazy(() => import('./views/Buttons/ButtonGroups'));
const Buttons = React.lazy(() => import('./views/Buttons/Buttons'));
const Charts = React.lazy(() => import('./views/Charts'));
const Dashboard = React.lazy(() => import('./views/Dashboard'));
const CoreUIIcons = React.lazy(() => import('./views/Icons/CoreUIIcons'));
const Flags = React.lazy(() => import('./views/Icons/Flags'));
const FontAwesome = React.lazy(() => import('./views/Icons/FontAwesome'));
const SimpleLineIcons = React.lazy(() => import('./views/Icons/SimpleLineIcons'));
const Alerts = React.lazy(() => import('./views/Notifications/Alerts'));
const Badges = React.lazy(() => import('./views/Notifications/Badges'));
const Modals = React.lazy(() => import('./views/Notifications/Modals'));
const Colors = React.lazy(() => import('./views/Theme/Colors'));
const Typography = React.lazy(() => import('./views/Theme/Typography'));
const Widgets = React.lazy(() => import('./views/Widgets/Widgets'));
const Users = React.lazy(() => import('./views/Users/Users'));
const User = React.lazy(() => import('./views/Users/User'));



// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/theme', exact: true, name: 'Theme', component: Colors },
  { path: '/theme/colors', name: 'Colors', component: Colors },
  { path: '/theme/typography', name: 'Typography', component: Typography },
  { path: '/base', exact: true, name: 'Base', component: Cards },
  { path: '/base/cards', name: 'Cards', component: Cards },
  { path: '/base/forms', name: 'Forms', component: Forms },
  { path: '/base/switches', name: 'Switches', component: Switches },
  { path: '/base/tables', name: 'Tables', component: Tables },

  { path: '/vacancies', name: 'Vacancies', component: Vacancies },
  { path: '/applications', name: 'Applications', component: Applications },
  { path: '/assessments', name: 'Assessments', component: Assessments },
  { path: '/appointmens', name: 'Appointments', component: Appointments },
  { path: '/addappointment/:id', name: 'Add Appointment', component: AddAppointment },
  { path: '/addanswer/:id', name: 'Add Answer', component: AddAnswer },
  { path: '/addVacancy', name: 'Add Vacancy', component: AddVacancy },
  { path: '/addAssessment', name: 'Add Assessment', component: AddAssessment },

  { path: '/employeeDashboard/:id', name: 'Employee Dashboard', component: EmployeePerformanceReport },
  { path: '/employees', name: 'List of Employee', component: Employees},

  { path: '/vacancies-applicant', name: 'Vacancies', component: VacanciesPelamar },
  { path: '/apply/:id', name: 'Application Form', component: ApplicationForm },
  { path: '/myapplications', name: 'My Applications', component: ApplicationsPelamar },
  { path: '/vacancy/update/:id', name: 'Update Vacancy', component: UpdateVacancy },
  { path: '/vacancy/:id', name: 'Vacancy Detail', component: VacancyDetail },
  { path: '/profile/:token', name: 'Profile', component: Profile },
  { path: '/applicants/:id', exact: true, name: 'Applicants', component: Applicants },
  { path: '/hire/:id', exact: true, name: 'Hire', component: Hire },
  { path: '/reject/:id', exact: true, name: 'Reject', component: Reject },
  { path: '/remoteTest/:id', exact: true, name: 'RemoteTest', component: RemoteTest },
  { path: '/updateAssessment/:id', name: 'Update Assessment', component: UpdateAssessment },
  { path: '/addUser', name: 'Add User', component: AddUser },
  { path: '/updateUser/:id', name: 'Update User', component: UpdateUser },

  { path: '/taskskaryawan/:username', name: 'Tasks Karyawan', component: TasksKaryawan },

  { path: '/base/tabs', name: 'Tabs', component: Tabs },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
  { path: '/base/carousels', name: 'Carousel', component: Carousels },
  { path: '/base/collapses', name: 'Collapse', component: Collapses },
  { path: '/base/dropdowns', name: 'Dropdowns', component: Dropdowns },
  { path: '/base/jumbotrons', name: 'Jumbotrons', component: Jumbotrons },
  { path: '/base/list-groups', name: 'List Groups', component: ListGroups },
  { path: '/base/navbars', name: 'Navbars', component: Navbars },
  { path: '/base/navs', name: 'Navs', component: Navs },
  { path: '/base/paginations', name: 'Paginations', component: Paginations },
  { path: '/base/popovers', name: 'Popovers', component: Popovers },
  { path: '/base/progress-bar', name: 'Progress Bar', component: ProgressBar },
  { path: '/base/tooltips', name: 'Tooltips', component: Tooltips },
  { path: '/buttons', exact: true, name: 'Buttons', component: Buttons },
  { path: '/buttons/buttons', name: 'Buttons', component: Buttons },
  { path: '/buttons/button-dropdowns', name: 'Button Dropdowns', component: ButtonDropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', component: ButtonGroups },
  { path: '/buttons/brand-buttons', name: 'Brand Buttons', component: BrandButtons },
  { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', component: Flags },
  { path: '/icons/font-awesome', name: 'Font Awesome', component: FontAwesome },
  { path: '/icons/simple-line-icons', name: 'Simple Line Icons', component: SimpleLineIcons },
  { path: '/notifications', exact: true, name: 'Notifications', component: Alerts },
  { path: '/notifications/alerts', name: 'Alerts', component: Alerts },
  { path: '/notifications/badges', name: 'Badges', component: Badges },
  { path: '/notifications/modals', name: 'Modals', component: Modals },
  { path: '/widgets', name: 'Widgets', component: Widgets },
  { path: '/charts', name: 'Charts', component: Charts },
  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },
];

export default routes;
