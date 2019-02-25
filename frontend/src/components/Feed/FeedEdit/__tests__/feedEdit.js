import 'jest-dom/extend-expect';
import 'react-testing-library/cleanup-after-each';
import 'jest-axe/extend-expect';
import React from 'react';
import {render} from 'react-testing-library';
// import {axe, toHaveNoViolations} from 'jest-axe';
import {axe} from 'jest-axe';
import FeedEdit from '../FeedEdit';

// expect.extend(toHaveNoViolations);

// mock console error to remove (delete) them in the tests result
beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  console.error.mockRestore();
});


test('test form is accessible', async () => {
  const {container} = render(<FeedEdit editing={true}/>);
  const results = await axe(container.innerHTML);
  console.log(results);
  expect(results).toHaveNoViolations();
});