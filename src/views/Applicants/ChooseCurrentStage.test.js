import React from 'react';
import ReactDOM from 'react-dom';
import ChooseCurrentStage from './ChooseCurrentStage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ChooseCurrentStage />, div);
  ReactDOM.unmountComponentAtNode(div);
});
