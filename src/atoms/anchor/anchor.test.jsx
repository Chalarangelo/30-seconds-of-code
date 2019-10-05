import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Anchor from './index';

configure({ adapter: new Adapter() });
console.warn = jest.fn();

describe('<Anchor />', () => {
  const innerText = 'Click me!';
  let link = { url: '#', internal: false };
  let wrapper, anchor;

  beforeEach(() => {
    wrapper = mount(<Anchor link={ link } >{ innerText }</Anchor>);
    anchor = wrapper.find('a');
  });

  it('should render correctly', () => {
    expect(wrapper).toContainMatchingElement('a');
  });

  it('should link to the passed URL', () => {
    expect(anchor.prop('href')).toBe(link.url);
  });

  it('should render passed children', () => {
    expect(anchor.text()).toBe(innerText);
  });

  describe('with internal link', () => {
    let internalLink = { url: 'home', internal: true };

    beforeEach(() => {
      wrapper = mount(<Anchor link={ internalLink } >{ innerText }</Anchor>);
      anchor = wrapper.find('a');
    });

    it('should link the appropriate internal URl', () => {
      expect(anchor.prop('href')).toBe(`/${internalLink.url}`);
    });
  });

  describe('with custom attributes', () => {
    let linkWithAttributes = {
      url: 'https://google.com',
      internal: false,
      rel: 'noopener noreferrer',
      target: '_blank',
    };

    beforeEach(() => {
      wrapper = mount(<Anchor link={ linkWithAttributes } >{ innerText }</Anchor>);
      anchor = wrapper.find('a');
    });

    it('should contain the passed "rel" attributes', () => {
      expect(anchor.prop('rel')).toBe(linkWithAttributes.rel);
    });

    it('should contain the passed "target" attributes', () => {
      expect(anchor.prop('target')).toBe(linkWithAttributes.target);
    });
  });
});

