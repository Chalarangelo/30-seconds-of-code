import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import CTA from './index';

configure({ adapter: new Adapter() });
console.warn = jest.fn();

describe('<CTA />', () => {
  const acceptsCookies = false;

  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <CTA acceptsCookies={ acceptsCookies } />
    );
  });

  it('should render a PageBackdrop component', () => {
    expect(wrapper).toContainMatchingElement('PageBackdrop');
  });

  it('should render an AnchorButton component', () => {
    expect(wrapper).toContainMatchingElement('AnchorButton');
  });

});
