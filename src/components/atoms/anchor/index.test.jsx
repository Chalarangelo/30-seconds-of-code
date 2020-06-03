import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Anchor from './index';

import { internalLink, externalLink, externalLinkWithAttributes } from 'fixtures/links';

configure({ adapter: new Adapter() });
console.warn = jest.fn();

describe('<Anchor />', () => {
  const innerText = 'Click me!';
  let wrapper, anchor;

  beforeEach(() => {
    wrapper = mount(<Anchor link={ externalLink } >{ innerText }</Anchor>);
    anchor = wrapper.find('a');
  });

  it('should render correctly', () => {
    expect(wrapper).toContainMatchingElement('a');
  });

  it('should link to the passed URL', () => {
    expect(anchor.prop('href')).toBe(externalLink.url);
  });

  it('should render passed children', () => {
    expect(anchor.text()).toBe(innerText);
  });

  describe('with internal link', () => {
    beforeEach(() => {
      wrapper = mount(<Anchor link={ internalLink } >{ innerText }</Anchor>);
      anchor = wrapper.find('a');
    });

    it('should link the appropriate internal URL', () => {
      expect(anchor.prop('href').indexOf(`/${internalLink.url}`)).toBe(0);
    });
  });

  describe('with custom attributes', () => {
    beforeEach(() => {
      wrapper = mount(<Anchor link={ externalLinkWithAttributes } >{ innerText }</Anchor>);
      anchor = wrapper.find('a');
    });

    it('should contain the passed "rel" attributes', () => {
      expect(anchor.prop('rel')).toBe(externalLinkWithAttributes.rel);
    });

    it('should contain the passed "target" attributes', () => {
      expect(anchor.prop('target')).toBe(externalLinkWithAttributes.target);
    });
  });
});

