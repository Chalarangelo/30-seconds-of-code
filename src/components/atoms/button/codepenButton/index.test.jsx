import React from 'react';
import { mount, configure } from 'enzyme';
import { act } from 'react-dom/test-utils';
import Adapter from 'enzyme-adapter-react-16';
import literals from 'lang/en/client/common';

import { codepenHtmlCode, codepenCssCode } from 'fixtures/strings';

import CodepenButton from './index';

jest.useFakeTimers();

configure({ adapter: new Adapter() });

describe('<CodepenButton />', () => {
  let wrapper;
  let button, input;

  beforeEach(() => {
    wrapper = mount(<CodepenButton htmlCode={ codepenHtmlCode } cssCode={ codepenCssCode } />);
    button = wrapper.find('button');
    input = wrapper.find('input');
  });

  it('should render correctly', () => {
    expect(wrapper).toContainMatchingElement('form');
    expect(wrapper).toContainMatchingElement('form > input');
    expect(wrapper).toContainMatchingElement('button.btn.codepen-btn');
  });

  it('should have an appropriate title attribute', () => {
    expect(wrapper).toContainMatchingElement('button.btn.codepen-btn[title]');
    expect(button.prop('title')).toBe(literals.codepen);
  });

  it('should pass data to the input field', () => {
    expect(input.props('value')).not.toBe(undefined);
  });

  describe('when clicked', () => {
    it('should play the microinteraction animation', () => {
      act(() => {
        button.simulate('click');
        jest.advanceTimersByTime(100);
        wrapper.update();
      });
      expect(setTimeout).toHaveBeenCalled();
      expect(wrapper).toContainMatchingElement('button.btn.codepen-btn.active');
      act(() => {
        button.simulate('click');
        jest.advanceTimersByTime(750);
        wrapper.update();
      });
      expect(wrapper).toContainMatchingElement('button.btn.codepen-btn:not(.active)');
    });
  });
});

