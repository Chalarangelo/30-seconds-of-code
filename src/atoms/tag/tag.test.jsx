import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Tag from './index';

configure({ adapter: new Adapter() });

describe('<Tag />', () => {
  let wrapper;

  describe('with valid name', () => {
    beforeEach(() => {
      wrapper = shallow(<Tag name='array' />);
    });

    it('should render correctly', () => {
      expect(wrapper).toContainMatchingElement('span.tag');
    });
  });

  describe('with empty name', () => {
    beforeEach(() => {
      wrapper = shallow(<Tag name={ undefined } />);
    });

    it('should not render anything', () => {
      expect(wrapper).not.toContainMatchingElement('span.tag');
    });
  });
});

