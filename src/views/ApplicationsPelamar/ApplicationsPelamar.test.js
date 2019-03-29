import React from 'react';
import ReactDOM from 'react-dom';
import ApplicationsPelamar from './ApplicationsPelamar';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ApplicationsPelamar />, div);
  ReactDOM.unmountComponentAtNode(div);
});
