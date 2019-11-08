import React from 'react';
import { Provider } from 'react-redux';
import createStore from 'state';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import _ from 'lang';
const _l = _('en');

import HomePage from './index';

configure({ adapter: new Adapter() });
console.warn = jest.fn();

const { store } = createStore();

describe('<HomePage />', () => {
  const logoSrc = '/assets/logo.png';
  let wrapper, shell, meta, simpleCard;

  beforeEach(() => {
    wrapper = mount(
      <Provider store={ store }>
        <HomePage pageContext={ { logoSrc } } />
      </Provider>
    );
    shell = wrapper.find('Shell');
    meta = wrapper.find('Meta');
    simpleCard = wrapper.find('SimpleCard');
  });

  describe('should render', () => {
    it('a Shell component', () => {
      expect(wrapper).toContainMatchingElement('Shell');
    });

    it('a Meta component', () => {
      expect(wrapper).toContainMatchingElement('Meta');
    });

    it('the home title', () => {
      expect(wrapper).toContainMatchingElement('h1.home-title');
    });

    it('the home subtitle', () => {
      expect(wrapper).toContainMatchingElement('p.home-sub-title');
    });

    it('a Search component', () => {
      expect(wrapper).toContainMatchingElement('Search');
    });

    it('an SimpleCard component', () => {
      expect(wrapper).toContainMatchingElement('SimpleCard');
    });
  });

  it('should pass the correct data to the Shell component', () => {
    expect(shell.prop('logoSrc')).toBe(logoSrc);
    expect(shell.prop('isSearch')).toBe(false);
    expect(shell.prop('isListing')).toBe(false);
  });

  it('should pass the correct data to the Meta component', () => {
    expect(meta.prop('logoSrc')).toBe(logoSrc);
    expect(meta.prop('title')).toBe(undefined);
  });

  it('should pass the correct data to the Meta component', () => {
    expect(simpleCard.prop('title')).toBe(_l('About us'));
    expect(simpleCard.text()).toContain(_l`m${'About us'}`);
  });
});

