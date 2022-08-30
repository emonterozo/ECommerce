import React from 'react';
import renderer from 'react-test-renderer';
import ProductForm from '../ProductForm';

it('renders correctly', () => {
  const tree = renderer.create(<ProductForm />).toJSON();
  expect(tree).toMatchSnapshot();
});
