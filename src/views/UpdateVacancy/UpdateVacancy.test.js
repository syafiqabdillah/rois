import React from 'react';
import ReactDOM from 'react-dom';
import UpdateVacancy from './UpdateVacancy';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<UpdateVacancy />, div);
  ReactDOM.unmountComponentAtNode(div);
});
