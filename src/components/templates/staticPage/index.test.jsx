import React from 'react';
import { Provider } from 'react-redux';
import createStore from 'state';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import aboutLiterals from 'lang/en/about';

import StaticPage from './index';

configure({ adapter: new Adapter() });
console.warn = jest.fn();

const { store } = createStore();

describe('<StaticPage />', () => {
  const logoSrc = '/assets/logo.png';
  const splashLogoSrc = '/assets/splash.png';
  let wrapper, shell, meta;

  beforeEach(() => {
    wrapper = mount(
      <Provider store={ store }>
        <StaticPage pageContext={ { logoSrc, splashLogoSrc, stringLiterals: aboutLiterals } } />
      </Provider>
    );
    shell = wrapper.find('Shell');
    meta = wrapper.find('Meta');
  });

  describe('should render', () => {
    it('a Shell component', () => {
      expect(wrapper).toContainMatchingElement('Shell');
    });

    it('a Meta component', () => {
      expect(wrapper).toContainMatchingElement('Meta');
    });

    it('a PageTitle component', () => {
      expect(wrapper).toContainMatchingElement('PageTitle');
    });

    it('a subtitle element', () => {
      expect(wrapper).toContainMatchingElement('.page-sub-title');
    });

    it('3 SimpleCard components', () => {
      expect(wrapper).toContainMatchingElements(3, 'SimpleCard');
    });
  });

  it('should pass the correct data to the Shell component', () => {
    expect(shell.prop('logoSrc')).toBe(logoSrc);
  });

  it('should pass the correct data to the Meta component', () => {
    expect(meta.prop('logoSrc')).toBe(splashLogoSrc);
    expect(meta.prop('title')).toBe(aboutLiterals.title);
  });
});

