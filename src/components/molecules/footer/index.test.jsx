import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Footer from './index';

configure({ adapter: new Adapter() });
console.warn = jest.fn();

describe('<Footer />', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = mount(
      <Footer />);
  });

  it('renders the appropriate component', () => {
    expect(wrapper).toContainMatchingElement('footer');
  });

  it('renders two sections', () => {
    expect(wrapper).toContainMatchingElements(2, 'p');
  });

  it('renders the links section', () => {
    expect(wrapper).toContainMatchingElements(4, 'footer > p:first-child a');
  });
});

