import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import PageTitle from './index';

configure({ adapter: new Adapter() });

describe('<PageTitle />', () => {
  let wrapper;
  const innerText = 'This is a title';

  beforeEach(() => {
    wrapper = mount(<PageTitle>{ innerText }</PageTitle>);
  });

  it('should render correctly', () => {
    expect(wrapper).toContainMatchingElement('h2.page-title');
  });

  it('should render passed children', () => {
    expect(wrapper.text()).toContain(innerText);
  });

});

