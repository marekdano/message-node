import 'jest-dom/extend-expect';
import React from 'react';
import {render} from 'react-testing-library';
import FilePicker from '../FilePicker';

test('renders a number input with a label "File"', () => {
  const {getByLabelText} = render(<FilePicker id={1} label={'File'}/>);
  const input = getByLabelText(/file/i);
  expect(input).toHaveAttribute('type', 'file');
});
