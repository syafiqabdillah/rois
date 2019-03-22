import React from 'react';
import ReactDOM from 'react-dom';
import Appointments from './Appointments';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Appointments />, div);
  ReactDOM.unmountComponentAtNode(div);
});
