import React from 'react';
import ReactDOM from 'react-dom';
import Reject from './Reject';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Reject />, div);
  ReactDOM.unmountComponentAtNode(div);
});
