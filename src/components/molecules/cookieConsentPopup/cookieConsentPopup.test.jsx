import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import CookieConsentPopup from './index';

configure({ adapter: new Adapter() });
console.warn = jest.fn();

describe('<CookieConsentPopup />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <CookieConsentPopup />);
  });


  it('renders the appropriate component', () => {
    expect(wrapper).toContainMatchingElement('div.cookie-consent-popup');
  });

});

