import React from 'react';
import { render, cleanup } from '@testing-library/react';
import TagList from './index';
import { tags } from 'fixtures/tags';

describe('<TagList />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(<TagList tags={tags} />).container;
  });

  afterEach(cleanup);

  it('should render correctly', () => {
    expect(wrapper.querySelectorAll('.tag-list')).toHaveLength(1);
  });

  it('should render a child for each passed tag name', () => {
    expect(wrapper.textContent).toBe('array, adapter, function');
  });
});
