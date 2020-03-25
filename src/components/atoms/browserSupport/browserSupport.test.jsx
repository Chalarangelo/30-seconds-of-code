import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import BrowserSupport from './index';

configure({ adapter: new Adapter() });

describe('<BrowserSupport />', () => {
  let wrapper;
  const supportPercentage = 96.51;
  const browserSupportHtml = '<ul><li><a href="https://caniuse.com/#feat=css-animation">https://caniuse.com/#feat=css-animation</a></li></ul>';

  beforeEach(() => {
    wrapper = mount(
      <BrowserSupport
        supportPercentage={ supportPercentage }
        browserSupportHtml={ browserSupportHtml }
      />);
  });

  it('should render correctly', () => {
    expect(wrapper).toContainMatchingElement('.browser-support-title');
    expect(wrapper).toContainMatchingElement('.browser-support-percentage');
    expect(wrapper).toContainMatchingElement('.browser-support-text');
  });

  it('should render passed supportPercentage', () => {
    expect(wrapper.find('.browser-support-percentage').text()).toContain(`${supportPercentage.toFixed(1)}`);
  });

  it('should render passed browserSupportHtml', () => {
    expect(wrapper.find('.browser-support-text').html()).toContain(`${browserSupportHtml}`);
  });

});

