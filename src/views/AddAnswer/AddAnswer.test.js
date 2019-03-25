import React from 'react';
import ReactDOM from 'react-dom';
import AddAnswer from './AddAnswer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AddAnswer />, div);
  ReactDOM.unmountComponentAtNode(div);
});
