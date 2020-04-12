import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import PageSubtitle from './index';

configure({ adapter: new Adapter() });

describe('<PageSubtitle />', () => {
  let wrapper;
  const innerText = 'This is a subtitle';

  beforeEach(() => {
    wrapper = mount(<PageSubtitle>{ innerText }</PageSubtitle>);
  });

  it('should render correctly', () => {
    expect(wrapper).toContainMatchingElement('p.page-sub-title');
  });

  it('should render passed children', () => {
    expect(wrapper.text()).toContain(innerText);
  });

  describe('light variation', () => {
    beforeEach(() => {
      wrapper = mount(<PageSubtitle isLight>{ innerText }</PageSubtitle>);
    });

    it('should use the correct class', () => {
      expect(wrapper).toContainMatchingElement('p.page-light-sub');
    });

  });

});

