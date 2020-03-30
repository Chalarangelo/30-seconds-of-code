import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Toggle from './index';

configure({ adapter: new Adapter() });

describe('<Toggle />', () => {
  let wrapper, toggle;
  const innerText = 'Toggle me!';
  let mockOnChangeCallback = jest.fn();

  beforeEach(() => {
    wrapper = mount(<Toggle
      onChange={ mockOnChangeCallback }>
      { innerText }
    </Toggle>
    );
    toggle = wrapper.find('input').at(0);
  });

  it('should render correctly', () => {
    expect(wrapper).toContainMatchingElement('.toggle');
    expect(wrapper).toContainMatchingElement('label > input[type="checkbox"]');
    expect(wrapper).toContainMatchingElement('.toggle-switch');
  });

  it('should render passed children', () => {
    expect(wrapper.text()).toBe(innerText);
  });

  describe('when clicked', () => {
    beforeEach(() => {
      toggle.simulate('change');
    });

    it('should call passed callback on click event', () => {
      expect(mockOnChangeCallback.mock.calls.length).toBeGreaterThan(0);
    });
  });
});

