import React from 'react';
import ReactDOM from 'react-dom';
import Vacancies from './Vacancies';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Vacancies />, div);
  ReactDOM.unmountComponentAtNode(div);
});
