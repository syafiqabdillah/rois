import React from 'react';
import ReactDOM from 'react-dom';
import RemoteTestStandby from './RemoteTestStandby';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RemoteTestStandby />, div);
  ReactDOM.unmountComponentAtNode(div);
});
