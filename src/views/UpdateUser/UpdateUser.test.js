import React from 'react';
import ReactDOM from 'react-dom';
import UpdateUser from './UpdateUser';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<UpdateUser />, div);
  ReactDOM.unmountComponentAtNode(div);
});
