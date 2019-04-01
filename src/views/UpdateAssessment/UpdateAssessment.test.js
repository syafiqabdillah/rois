import React from 'react';
import ReactDOM from 'react-dom';
import UpdateAssessment from './UpdateAssessment';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<UpdateAssessment />, div);
  ReactDOM.unmountComponentAtNode(div);
});
