import React from 'react';
import ReactDOM from 'react-dom';
import AddAssessment from './AddAssessment';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AddAssessment />, div);
  ReactDOM.unmountComponentAtNode(div);
});
