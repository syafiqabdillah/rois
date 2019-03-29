import React from 'react';
import ReactDOM from 'react-dom';
import VacancyDetail from './VacancyDetail';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<VacancyDetail />, div);
  ReactDOM.unmountComponentAtNode(div);
});
