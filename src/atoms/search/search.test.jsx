import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Search from './index';

configure({ adapter: new Adapter() });

describe('<Search />', () => {
  let wrapper;
  let mockSetSearchQueryCallback = jest.fn();
  let input;

  beforeEach(() => {
    wrapper = mount(
      <Search setSearchQuery={ mockSetSearchQueryCallback } />
    );
    input = wrapper.find('input');
  });

  it('should render correctly', () => {
    expect(wrapper).toContainMatchingElement('input[type="search"]');
  });

  it('should call passed callback on keyUp event', () => {
    input.simulate('keypress', { target: { value: 'p'} });
    expect(mockSetSearchQueryCallback.mock.calls.length).toBeGreaterThan(0);
  });

  describe('with defaultValue', () => {
    const defaultValue = 'query';

    beforeEach(() => {
      wrapper = mount(<Search defaultValue={ defaultValue } setSearchQuery={ () => {} } />);
      input = wrapper.find('input');
    });

    it('should render with an initial value', () => {
      expect(input.instance().value).toBe(defaultValue);
    });
  });
});

