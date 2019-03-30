import React from 'react';
import ReactDOM from 'react-dom';
import FinalStage from './FinalStage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FinalStage />, div);
  ReactDOM.unmountComponentAtNode(div);
});
