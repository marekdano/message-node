import 'jest-dom/extend-expect';
import 'react-testing-library/cleanup-after-each';
import React from 'react';
import {render} from 'react-testing-library';
import Backdrop from '../Backdrop';
import { fireEvent } from 'react-testing-library/dist';

test('shows backdrop portal and a close button', () => {
  const handleClose = jest.fn();
  const {getByTestId} = render(<Backdrop open={true} onClick={handleClose} />);
	
  expect(getByTestId(/backdrop/i)).toHaveClass('backdrop');
	
  fireEvent.click(getByTestId(/backdrop/i));

  expect(handleClose).toBeCalledTimes(1);
});
