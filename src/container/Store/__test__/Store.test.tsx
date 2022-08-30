import React from 'react';
import renderer from 'react-test-renderer';
import Store from '../Store';

it('renders correctly', () => {
  const tree = renderer.create(<Store />).toJSON();
  expect(tree).toMatchSnapshot();
});
