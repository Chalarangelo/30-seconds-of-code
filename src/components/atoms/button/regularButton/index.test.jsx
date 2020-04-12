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

  it('should append passed classNames', () => {
    expect(wrapper).toContainMatchingElement('.btn.secondary');
  });

  it('should render passed children', () => {
    expect(wrapper.text()).toBe(innerText);
  });

  describe('without additional classNames', () => {
    beforeEach(() => {
      wrapper = mount(<Button>{ innerText }</Button>);
    });

    it('should render with the default className', () => {
      expect(wrapper.find('button').prop('className')).toBe('btn');
    });
  });
});

