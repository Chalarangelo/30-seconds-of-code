import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import PageGraphic from './index';

configure({ adapter: new Adapter() });

describe('<PageGraphic />', () => {
  let wrapper;
  const innerText = 'This is a page';

  beforeEach(() => {
    wrapper = mount(<PageGraphic className='search-empty'>{ innerText }</PageGraphic>);
  });

  it('should render correctly', () => {
    expect(wrapper).toContainMatchingElement('div.page-graphic');
  });

  it('should append passed classes', () => {
    expect(wrapper).toContainMatchingElement('.page-graphic.search-empty');
  });

  it('should render passed children', () => {
    expect(wrapper.text()).toContain(innerText);
  });

  describe('without additional classNames', () => {
    beforeEach(() => {
      wrapper = mount(<PageGraphic>{ innerText }</PageGraphic>);
    });

    it('should render with the default className', () => {
      expect(wrapper.find('div').prop('className')).toBe('page-graphic');
    });
  });

});

