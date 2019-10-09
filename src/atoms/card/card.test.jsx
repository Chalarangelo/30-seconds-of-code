import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Card from './index';

configure({ adapter: new Adapter() });

describe('<Card />', () => {
  let wrapper;
  const innerText = 'This is a card';

  beforeEach(() => {
    wrapper = mount(<Card className='special'>{ innerText }</Card>);
  });

  it('should render correctly', () => {
    expect(wrapper).toContainMatchingElement('div.card');
  });

  it('should append passed classes', () => {
    expect(wrapper).toContainMatchingElement('.card.special');
  });

  it('should render passed children', () => {
    expect(wrapper.text()).toBe(innerText);
  });

});

