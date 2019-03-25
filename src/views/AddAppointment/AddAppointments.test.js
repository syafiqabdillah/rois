import React from 'react';
import ReactDOM from 'react-dom';
import AddAppointment from './AddAppointment';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AddAppointment />, div);
  ReactDOM.unmountComponentAtNode(div);
});
