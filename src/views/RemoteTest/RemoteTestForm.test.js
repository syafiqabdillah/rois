import React from 'react';
import ReactDOM from 'react-dom';
import RemoteTestForm from './RemoteTestForm';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RemoteTestForm />, div);
  ReactDOM.unmountComponentAtNode(div);
});
