import 'jest-dom/extend-expect';
import React from 'react';
import ReactDOM from 'react-dom';
import FilePicker from '../FilePicker';

test('renders a number input with a label "File"', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FilePicker id={1} label={'File'}/>, div);
  expect(div.querySelector('input')).toHaveAttribute('type', 'file');
  expect(div.querySelector('label')).toHaveTextContent('File');
});
