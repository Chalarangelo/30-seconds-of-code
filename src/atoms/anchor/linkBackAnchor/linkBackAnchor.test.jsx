import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import LinkBackAnchor from './index';

configure({ adapter: new Adapter() });
console.warn = jest.fn();

describe('<LinkBackAnchor />', () => {
  const innerText = 'Click me!';
  let link = { url: '#', internal: false };
  let wrapper, anchor;

  beforeEach(() => {
    wrapper = mount(<LinkBackAnchor link={ link } >{ innerText }</LinkBackAnchor>);
    anchor = wrapper.find('Anchor');
  });

  it('should render correctly', () => {
    expect(wrapper).toContainMatchingElement('Anchor');
  });

  it('should pass the link to the wrapped Anchor', () => {
    expect(anchor.prop('link')).toEqual(link);
  });

  it('should render passed children', () => {
    expect(anchor.text()).toBe(innerText);
  });

  it('should render passed children', () => {
    expect(anchor.prop('className')).toBe('link-back');
  });
});

