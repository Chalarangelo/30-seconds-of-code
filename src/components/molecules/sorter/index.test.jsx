import { render, cleanup, fireEvent } from '@testing-library/react';
import Sorter from './index';
import { orders } from 'fixtures/sorter';

describe('<Sorter />', () => {
  const selectedOrder = 'Popularity';
  let wrapper;
  let clickableEl;

  beforeEach(() => {
    wrapper = render(
      <Sorter
        sorter={{
          orders,
          selectedOrder,
        }}
      />
    ).container;
  });

  afterEach(cleanup);

  describe('should render', () => {
    it('the outer wrapper', () => {
      expect(wrapper.querySelectorAll('.sorter')).toHaveLength(1);
    });

    it('the inner wrapper', () => {
      expect(wrapper.querySelectorAll('.sorter-inner')).toHaveLength(1);
    });

    it('the correct amount of buttons', () => {
      expect(wrapper.querySelectorAll('a.btn.order-btn')).toHaveLength(2);
    });
  });

  it('should not be open by default', () => {
    expect(wrapper.querySelectorAll('.sorter.open')).toHaveLength(0);
  });

  describe('when clicked', () => {
    beforeEach(() => {
      clickableEl = wrapper.querySelector('.order-btn.selected');
      fireEvent.click(clickableEl);
    });

    it('should open the sorter', () => {
      expect(wrapper.querySelectorAll('.sorter.open')).toHaveLength(1);
    });

    describe('a second time', () => {
      beforeEach(() => {
        fireEvent.click(clickableEl);
      });

      it('should close the sorter', () => {
        expect(wrapper.querySelectorAll('.sorter.open')).toHaveLength(0);
      });
    });
  });

  describe('with a single sorting order', () => {
    beforeEach(() => {
      wrapper = render(
        <Sorter
          sorter={{
            orders: orders.slice(0, 1),
            selectedOrder,
          }}
        />
      ).container;
    });

    it('should not render', () => {
      expect(wrapper.querySelectorAll('.sorter')).toHaveLength(0);
    });
  });
});
