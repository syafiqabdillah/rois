import React from 'react';
import ReactDOM from 'react-dom';
import Applications from './Applications';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Applications />, div);
  ReactDOM.unmountComponentAtNode(div);
});
