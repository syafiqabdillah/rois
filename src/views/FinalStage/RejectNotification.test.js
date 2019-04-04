import React from 'react';
import ReactDOM from 'react-dom';
import RejectNotification from './RejectNotification';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RejectNotification />, div);
  ReactDOM.unmountComponentAtNode(div);
});
