import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Button from './index';

configure({ adapter: new Adapter() });

describe('<Button />', () => {
  let wrapper;
  const innerText = 'Click me!';

  beforeEach(() => {
    wrapper = mount(<Button className="secondary">{ innerText }</Button>);
  });

  it('should render correctly', () => {
    expect(wrapper).toContainMatchingElement('button.btn');
  });

  it('should append passed classes', () => {
    expect(wrapper).toContainMatchingElement('.btn.secondary');
  });

  it('should render passed children', () => {
    expect(wrapper.text()).toBe(innerText);
  });
});

