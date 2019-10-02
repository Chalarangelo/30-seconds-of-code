import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Toast from './index';

configure({ adapter: new Adapter() });

describe('<Toast />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Toast message='Snippet copied to clipboard!' />);
  });

  it('should render correctly', () => {
    expect(wrapper).toContainMatchingElement('div.toast');
  });

});

