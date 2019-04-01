import React from 'react';
import ReactDOM from 'react-dom';
import VacanciesPelamar from './VacanciesPelamar';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<VacanciesPelamar />, div);
  ReactDOM.unmountComponentAtNode(div);
});
