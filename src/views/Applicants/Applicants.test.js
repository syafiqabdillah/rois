import React from 'react';
import ReactDOM from 'react-dom';
import Applicants from './Applicants';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Applicants />, div);
  ReactDOM.unmountComponentAtNode(div);
});
