import React from 'react';
import ReactDOM from 'react-dom';
import RemoteTestNotification from './RemoteTestNotification';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RemoteTestNotification />, div);
  ReactDOM.unmountComponentAtNode(div);
});
