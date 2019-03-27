import React from 'react';
import ReactDOM from 'react-dom';
import ApplicationForm from './ApplicationForm';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ApplicationForm />, div);
  ReactDOM.unmountComponentAtNode(div);
});
