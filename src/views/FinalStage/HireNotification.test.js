import React from 'react';
import ReactDOM from 'react-dom';
import HireNotification from './HireNotification';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<HireNotification />, div);
  ReactDOM.unmountComponentAtNode(div);
});
