import React from 'react';
import { render, cleanup } from '@testing-library/react';
import CollectionChip from './index';
import { collectionChip } from 'fixtures/collections';

describe('<CollectionChip />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(<CollectionChip chip={collectionChip} />).container;
  });

  afterEach(cleanup);

  it('should render correctly', () => {
    expect(wrapper.querySelectorAll('li.collection-chip')).toHaveLength(1);
  });

  it('should render the correct icon', () => {
    expect(
      wrapper.querySelectorAll(
        `.collection-chip-link.icon.icon-${collectionChip.icon}`
      )
    ).toHaveLength(1);
  });

  it('should have the correct link', () => {
    expect(wrapper.querySelector('a').href).toBe(collectionChip.url);
  });

  it('should have the correct text', () => {
    expect(wrapper.textContent).toBe(collectionChip.name);
  });
});
