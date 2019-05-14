import React from 'react';
import ReactDOM from 'react-dom';
import ListOnboardingTask from './ListOnboardingTask';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ListOnboardingTask />, div);
  ReactDOM.unmountComponentAtNode(div);
});
