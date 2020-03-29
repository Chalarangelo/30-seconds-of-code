import React from 'react';
import { mount, configure } from 'enzyme';
import { act } from 'react-dom/test-utils';
import Adapter from 'enzyme-adapter-react-16';
import literals from 'lang/en/client/common';
import copyToClipboard from 'copy-to-clipboard';

import CopyButton from './index';

const copyToClipboardMock = jest.fn();
jest.mock('copy-to-clipboard');
jest.useFakeTimers();

configure({ adapter: new Adapter() });

describe('<CopyButton />', () => {
  let wrapper;
  let button;
  const copyText = 'Lorem ipsum';

  beforeAll(() => {
    copyToClipboard.mockImplementation(copyToClipboardMock);
  });

  beforeEach(() => {
    wrapper = mount(<CopyButton text={ copyText } />);
    button = wrapper.find('button');
  });

  it('should render correctly', () => {
    expect(wrapper).toContainMatchingElement('button.btn.copy-btn');
  });

  it('should have an appropriate title attribute', () => {
    expect(wrapper).toContainMatchingElement('button.btn.copy-btn[title]');
    expect(button.prop('title')).toBe(literals.copyToClipboard);
  });

  describe('when clicked', () => {
    it('should copy to clipboard and play the microinteraction animation', () => {
      act(() => {
        button.simulate('click');
        jest.advanceTimersByTime(100);
        wrapper.update();
      });
      expect(copyToClipboardMock.mock.calls.length).toBeGreaterThan(0);
      expect(setTimeout).toHaveBeenCalled();
      expect(wrapper).toContainMatchingElement('button.btn.copy-btn.active');
      act(() => {
        button.simulate('click');
        jest.advanceTimersByTime(750);
        wrapper.update();
      });
      expect(wrapper).toContainMatchingElement('button.btn.copy-btn:not(.active)');
    });
  });
});

