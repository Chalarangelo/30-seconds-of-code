import React from 'react';
import { render, cleanup } from '@testing-library/react';
import PageTitle from './index';

describe('<PageTitle />', () => {
  let wrapper;
  const innerText = 'This is a title';

  beforeEach(() => {
    wrapper = render(<PageTitle className='light'>{innerText}</PageTitle>)
      .container;
  });

  afterEach(cleanup);

  it('should render correctly', () => {
    expect(wrapper.querySelectorAll('h2.page-title')).toHaveLength(1);
  });

  it('should append passed classes', () => {
    expect(wrapper.querySelectorAll('.page-title.light')).toHaveLength(1);
  });

  it('should render passed children', () => {
    expect(wrapper.textContent).toContain(innerText);
  });

  describe('without additional classNames', () => {
    beforeEach(() => {
      wrapper = render(<PageTitle>{innerText}</PageTitle>).container;
    });

    it('should render with the default className', () => {
      expect(wrapper.querySelectorAll('h2.page-title')).toHaveLength(1);
    });
  });
});
