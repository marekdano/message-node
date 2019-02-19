import 'jest-dom/extend-expect';
import React from 'react';
import ReactDOM from 'react-dom';
import {getQueriesForElement} from 'dom-testing-library';
import FilePicker from '../FilePicker';

test('renders a number input with a label "File"', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FilePicker id={1} label={'File'}/>, div);
  // expect(div.querySelector('input')).toHaveAttribute('type', 'file');
  // expect(div.querySelector('label')).toHaveTextContent('File');
  const {getByLabelText} = getQueriesForElement(div);
  const input = getByLabelText(/file/i);
  expect(input).toHaveAttribute('type', 'file');
});
