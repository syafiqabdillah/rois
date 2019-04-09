import React from 'react';
import ReactDOM from 'react-dom';
import RemoteTest from './RemoteTest';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RemoteTest />, div);
  ReactDOM.unmountComponentAtNode(div);
});
