import React from 'react';
import ReactDOM from 'react-dom';
import Assessments from './Assessments';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Assessments />, div);
  ReactDOM.unmountComponentAtNode(div);
});
