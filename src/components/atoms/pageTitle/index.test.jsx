import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import PageTitle from './index';

configure({ adapter: new Adapter() });

describe('<PageTitle />', () => {
  let wrapper;
  const innerText = 'This is a title';

  beforeEach(() => {
    wrapper = mount(<PageTitle className='light'>{ innerText }</PageTitle>);
  });

  it('should render correctly', () => {
    expect(wrapper).toContainMatchingElement('h2.page-title');
  });

  it('should append passed classes', () => {
    expect(wrapper).toContainMatchingElement('.page-title.light');
  });

  it('should render passed children', () => {
    expect(wrapper.text()).toContain(innerText);
  });

  describe('without additional classNames', () => {
    beforeEach(() => {
      wrapper = mount(<PageTitle>{ innerText }</PageTitle>);
    });

    it('should render with the default className', () => {
      expect(wrapper.find('h2').prop('className')).toBe('page-title');
    });
  });

});

