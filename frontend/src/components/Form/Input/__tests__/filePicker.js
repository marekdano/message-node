import 'jest-dom/extend-expect';
import React from 'react';
import ReactDOM from 'react-dom';
import {getQueriesForElement} from 'dom-testing-library';
import FilePicker from '../FilePicker';

function render(ui) {
  const container = document.createElement('div');
  ReactDOM.render(ui, container);
  const queries = getQueriesForElement(container);
  return {
    container,
    ...queries
  };
}

test('renders a number input with a label "File"', () => {
  const {getByLabelText} = render(<FilePicker id={1} label={'File'}/>);
  const input = getByLabelText(/file/i);
  expect(input).toHaveAttribute('type', 'file');
});
