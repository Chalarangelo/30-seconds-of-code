import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import AnchorButton from './index';

configure({ adapter: new Adapter() });

describe('<AnchorButton />', () => {
  let wrapper, button;
  const link = { url: '#', internal: false };
  const innerText = 'Click me!';

  beforeEach(() => {
    wrapper = mount(<AnchorButton link={ link } >{ innerText }</AnchorButton>);
    button = wrapper.find('a.btn');
  });

  it('should render correctly', () => {
    expect(wrapper).toContainMatchingElement('a.btn');
  });

  it('should link to the passed URL', () => {
    expect(button.prop('href')).toBe(link.url);
  });

  it('should render passed children', () => {
    expect(button.text()).toBe(innerText);
  });
});

