import React from 'react';
import ReactDOM from 'react-dom';
import TasksList from './TasksList';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TasksList />, div);
  ReactDOM.unmountComponentAtNode(div);
});
