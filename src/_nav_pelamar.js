let token = localStorage.getItem('token')
export default {
  items: [
    {
      title: true,
      name: 'Menu',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Home',
      url: '/vacancies-applicant',
      icon: 'icon-pie-chart',
    },
    {
      name: 'Profile',
      url: '/profile/' + token,
      icon: 'icon-pie-chart',
    },
    {
      name: 'My Applications',
      url: '/myapplications',
      icon: 'icon-pie-chart',
    }
  ],
};
