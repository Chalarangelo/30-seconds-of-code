import React from 'react';
import { render, cleanup } from '@testing-library/react';
import SimpleCard from './index';

describe('<SimpleCard />', () => {
  let wrapper;
  const innerText = 'This is a card';
  const innerHTML = { __html: '<p>This is a card</p>' };
  const title = 'Simple card';

  beforeEach(() => {
    wrapper = render(<SimpleCard title={title} className='special' />)
      .container;
  });

  afterEach(cleanup);

  it('should render correctly', () => {
    expect(wrapper.querySelectorAll('div.card')).toHaveLength(1);
  });

  it('should append passed classes', () => {
    expect(wrapper.querySelectorAll('.card.special')).toHaveLength(1);
  });

  it('should render passed title', () => {
    expect(wrapper.querySelectorAll('.card-title')).toHaveLength(1);
    expect(wrapper.textContent).toContain(title);
  });

  describe('with children', () => {
    beforeEach(() => {
      wrapper = render(
        <SimpleCard title={title} className='special'>
          {innerText}
        </SimpleCard>
      ).container;
    });

    it('should render passed children', () => {
      expect(wrapper.textContent).toContain(innerText);
    });
  });

  describe('with inner HTML', () => {
    beforeEach(() => {
      wrapper = render(
        <SimpleCard
          title={title}
          className='special'
          dangerouslySetInnerHTML={innerHTML}
        />
      ).container;
    });

    it('should render passed children', () => {
      expect(wrapper.innerHTML).toContain(innerHTML.__html);
    });
  });
});
