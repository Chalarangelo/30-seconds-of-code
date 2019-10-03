import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import _ from 'lang';
const _l = _('en');

import CopyButton from './index';
/* eslint-disable */
jest.mock('react-copy-to-clipboard', () => {
  const React = require('react');
  return {
    CopyToClipboard: ({ onCopy, text, children }) => {
      return(
        <>
          {
            (Array.isArray(children) ? children : [children]).map((child, id) =>
              React.cloneElement(child, { onClick: () => onCopy(text), key: id }))
          }
        </>
      );
    },
  };
});
/* eslint-enable */

configure({ adapter: new Adapter() });

describe('<CopyButton />', () => {
  let wrapper;
  let mockOnCopyCallback = jest.fn();
  let button;
  const copyText = 'Lorem ipsum';

  beforeEach(() => {
    wrapper = mount(<CopyButton text={ copyText } onCopy={ mockOnCopyCallback } />);
    button = wrapper.find('button');
  });

  it('should render correctly', () => {
    expect(wrapper).toContainMatchingElement('button.btn.copy-btn');
  });

  it('should have an appropriate title attribute', () => {
    expect(wrapper).toContainMatchingElement('button.btn.copy-btn[title]');
    expect(button.prop('title')).toBe(_l('Copy to clipboard'));
  });

  describe('when clicked', () => {
    beforeEach(() => {
      button.simulate('click');
    });

    it('should call passed callback on click event', () => {
      expect(mockOnCopyCallback.mock.calls.length).toBeGreaterThan(0);
    });

    it('should copy text to clipboard on click event', () => {
      /*
        This is a mock, the imported component should handle copying
        for us. This test will always pass, even if copying doesn't
        really work. The point is that the given text value gets to
        the CopyToClipboard component via our component, which in
        turn should handle the copying.
      */
      expect(mockOnCopyCallback.mock.calls[0][0]).toBe(copyText);
    });
  });
});

