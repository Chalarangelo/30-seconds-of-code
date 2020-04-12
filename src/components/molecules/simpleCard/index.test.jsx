import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import SimpleCard from './index';

configure({ adapter: new Adapter() });

describe('<SimpleCard />', () => {
  let wrapper;
  const innerText = 'This is a card';
  const innerHTML = {__html: '<p>This is a card</p>'};
  const title = 'Simple card';

  beforeEach(() => {
    wrapper = mount(<SimpleCard title={ title } className='special' />);
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

  describe('with children', () => {
    beforeEach(() => {
      wrapper = mount(<SimpleCard title={ title } className='special' >{ innerText }</SimpleCard>);
    });

    it('should render passed children', () => {
      expect(wrapper.text()).toContain(innerText);
    });
  });

  describe('with inner HTML', () => {
    beforeEach(() => {
      wrapper = mount(<SimpleCard title={ title } className='special' dangerouslySetInnerHTML={ innerHTML }/>);
    });

    it('should render passed children', () => {
      expect(wrapper.html()).toContain(innerHTML.__html);
    });
  });

});

