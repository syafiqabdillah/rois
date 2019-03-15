import React from 'react';
import ReactDOM from 'react-dom';
import VacancyTable from './VacancyTable';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<VacancyTable />, div);
  ReactDOM.unmountComponentAtNode(div);
});
