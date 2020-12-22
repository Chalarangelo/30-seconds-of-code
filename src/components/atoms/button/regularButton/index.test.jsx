import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Button from './index';

describe('<Button />', () => {
  let wrapper;
  const innerText = 'Click me!';

  beforeEach(() => {
    wrapper = render(<Button className='secondary'>{innerText}</Button>)
      .container;
  });

  afterEach(cleanup);

  it('should render correctly', () => {
    expect(wrapper.querySelectorAll('button.btn')).toHaveLength(1);
  });

  it('should append passed classNames', () => {
    expect(wrapper.querySelectorAll('.btn.secondary')).toHaveLength(1);
  });

  it('should render passed children', () => {
    expect(wrapper.textContent).toBe(innerText);
  });

  describe('without additional classNames', () => {
    beforeEach(() => {
      wrapper = render(<Button>{innerText}</Button>).container;
    });

    it('should render with the default className', () => {
      expect(wrapper.querySelector('button').className).toBe('btn');
    });
  });
});
