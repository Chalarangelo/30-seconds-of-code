import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Card from './index';

describe('<Card />', () => {
  let wrapper;
  const innerText = 'This is a card';

  beforeEach(() => {
    wrapper = render(<Card className='special'>{innerText}</Card>).container;
  });

  afterEach(cleanup);

  it('should render correctly', () => {
    expect(wrapper.querySelectorAll('div.card')).toHaveLength(1);
  });

  it('should append passed classes', () => {
    expect(wrapper.querySelectorAll('.card.special')).toHaveLength(1);
  });

  it('should render passed children', () => {
    expect(wrapper.textContent).toBe(innerText);
  });

  describe('without additional classNames', () => {
    beforeEach(() => {
      wrapper = render(<Card>{innerText}</Card>).container;
    });

    it('should render with the default className', () => {
      expect(wrapper.querySelectorAll('div.card')).toHaveLength(1);
    });
  });
});
