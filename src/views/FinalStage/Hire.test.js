import React from 'react';
import ReactDOM from 'react-dom';
import Hire from './Hire';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Hire />, div);
  ReactDOM.unmountComponentAtNode(div);
});
