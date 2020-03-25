import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Sorter from './index';

configure({ adapter: new Adapter() });
console.warn = jest.fn();

describe('<Sorter />', () => {
  const orders = [
    {title: 'Popularity', url: '/list/p/1'},
    {title: 'Expertise', url: '/list/e/1'},
  ];
  const selectedOrder = 'Popularity';
  let wrapper;
  let clickableEl;

  beforeEach(() => {
    wrapper = mount(
      <Sorter sorter={ {
        orders,
        selectedOrder,
      } } />);
    clickableEl = wrapper.find('.order-btn.selected');
  });

  describe('should render', () => {
    it('the outer wrapper', () => {
      expect(wrapper).toContainMatchingElement('.sorter');
    });

    it('the inner wrapper', () => {
      expect(wrapper).toContainMatchingElement('.sorter-inner');
    });

    it('the correct amount of buttons', () => {
      expect(wrapper).toContainMatchingElements(2, 'a.btn.order-btn');
    });
  });

  it('should not be open by default', () => {
    expect(wrapper).not.toContainMatchingElement('.sorter.open');
  });

  describe('when clicked', () => {
    beforeEach(() => {
      clickableEl.at(0).simulate('click');
    });

    it('should open the sorter', () => {
      expect(wrapper).toContainMatchingElement('.sorter.open');
    });

    describe('a second time', () => {
      beforeEach(() => {
        clickableEl.at(0).simulate('click');
      });

      it('should close the sorter', () => {
        expect(wrapper).not.toContainMatchingElement('.sorter.open');
      });

    });
  });
});

