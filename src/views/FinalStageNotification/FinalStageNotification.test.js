import React from 'react';
import ReactDOM from 'react-dom';
import FinalStageNotification from './FinalStageNotification';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FinalStageNotification />, div);
  ReactDOM.unmountComponentAtNode(div);
});
