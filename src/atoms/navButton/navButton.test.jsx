import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavButton from './index';

configure({ adapter: new Adapter() });

describe('<NavButton />', () => {
  let wrapper, button;
  const icon = 'search';
  const link = { url: '#', internal: false };

  beforeEach(() => {
    wrapper = mount(<NavButton link={ link } icon={ icon } />);
    button = wrapper.find('a.nav-btn');
  });

  it('should render correctly', () => {
    expect(wrapper).toContainMatchingElement('a.nav-btn');
  });

  it('should render with the correct icon class', () => {
    expect(wrapper).toContainMatchingElement(`a.nav-btn.${icon}`);
  });

  it('should link to the passed URL', () => {
    expect(button.prop('href')).toBe(link.url);
  });
});

