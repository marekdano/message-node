import 'jest-dom/extend-expect';
import 'react-testing-library/cleanup-after-each';
import React from 'react';
import {render, bindElementToQueries, fireEvent } from 'react-testing-library';
import Modal from '../Modal';

const bodyUtils = bindElementToQueries(document.body);

function renderModal() {
  const renderUtils = render(<Modal />);
  const portalNode = bodyUtils.getByTestId('portal-modal');
  return {
    portalNode,
    ...renderUtils,
    ...bindElementToQueries(portalNode),
  };
}

test('renders portal modal', () => {
  const {getByText} = renderModal(<Modal />);
  
  expect(getByText('Accept')).toBeInTheDocument();
  expect(getByText('Cancel')).toBeInTheDocument();

  fireEvent.click(getByText(/Cancel/i));
});	