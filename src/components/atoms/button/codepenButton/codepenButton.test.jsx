import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import literals from 'lang/en/client/common';

import CodepenButton from './index';
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

describe('<CodepenButton />', () => {
  let wrapper;
  let button, input;
  const htmlCode = '<p class="my-special-snippet">Hello, this is white on red.</p>';
  const cssCode = `.my-special-snippet {
    background: red;
    color: white;
  }`;

  beforeEach(() => {
    wrapper = mount(<CodepenButton htmlCode={ htmlCode } cssCode={ cssCode } />);
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
});

