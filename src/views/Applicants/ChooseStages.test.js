import React from 'react';
import ReactDOM from 'react-dom';
import ChooseStages from './ChooseStages';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ChooseStages />, div);
  ReactDOM.unmountComponentAtNode(div);
});
