import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import SimpleCard from './index';

configure({ adapter: new Adapter() });

describe('<SimpleCard />', () => {
  let wrapper;
  const innerText = 'This is a card';
  const title = 'Simple card';

  beforeEach(() => {
    wrapper = mount(<SimpleCard title={ title } className='special'>{ innerText }</SimpleCard>);
  });

  it('should render correctly', () => {
    expect(wrapper).toContainMatchingElement('div.card');
  });

  it('should append passed classes', () => {
    expect(wrapper).toContainMatchingElement('.card.special');
  });

  it('should render passed title', () => {
    expect(wrapper).toContainMatchingElement('.card-title');
    expect(wrapper.text()).toContain(title);
  });

  it('should render passed children', () => {
    expect(wrapper.text()).toContain(innerText);
  });

});

