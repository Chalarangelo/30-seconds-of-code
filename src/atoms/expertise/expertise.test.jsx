import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import _ from 'lang';
const _l = _('en');

import { EXPERTISE_LEVELS } from 'shared';
import Expertise from './index';

configure({ adapter: new Adapter() });

describe('<Expertise />', () => {
  const level = EXPERTISE_LEVELS[0];
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Expertise level={ level }/>);
  });

  it('should render correctly', () => {
    expect(wrapper).toContainMatchingElement('div.expertise');
  });

  it('should have an appropriate title attribute', () => {
    expect(wrapper).toContainMatchingElement('div.expertise[title]');
    expect(wrapper.find('.expertise').prop('title')).toBe(_l`Expertise${level}`);
  });

});

