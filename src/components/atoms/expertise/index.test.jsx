import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Expertise from './index';

import { beginner } from 'fixtures/expertise';

configure({ adapter: new Adapter() });

describe('<Expertise />', () => {
  const level = beginner;
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Expertise level={ level }/>);
  });

  it('should render correctly', () => {
    expect(wrapper).toContainMatchingElement('span.expertise');
  });

  it('should get the appropriate class from expertise level', () => {
    expect(wrapper).toContainMatchingElement(`.expertise.${level.toLowerCase()}`);
  });

  describe('without a level value', () => {
    beforeEach(() => {
      wrapper = mount(<Expertise />);
    });

    it('should render the default expertise tag', () => {
      expect(wrapper).toContainMatchingElement('span.expertise.intermediate');
    });
  });

  describe('with an explicitly empty level value', () => {
    beforeEach(() => {
      wrapper = mount(<Expertise level={ null } />);
    });

    it('should render the default expertise tag', () => {
      expect(wrapper).not.toContainMatchingElement('span.expertise');
    });
  });

});

