import React from 'react';
import { Provider } from 'react-redux';
import createStore from 'state';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import _ from 'lang';
const _l = _('en');

import NotFoundPage from './index';

configure({ adapter: new Adapter() });
console.warn = jest.fn();

const { store } = createStore();

describe('<NotFoundPage />', () => {
  const logoSrc = '/assets/logo.png';
  let wrapper, shell, meta, pageBackdrop, anchorButton;

  beforeEach(() => {
    wrapper = mount(
      <Provider store={ store }>
        <NotFoundPage pageContext={ { logoSrc } } />
      </Provider>
    );
    shell = wrapper.find('Shell');
    meta = wrapper.find('Meta');
    pageBackdrop = wrapper.find('PageBackdrop');
    anchorButton = wrapper.find('AnchorButton');
  });

  describe('should render', () => {
    it('a Shell component', () => {
      expect(wrapper).toContainMatchingElement('Shell');
    });

    it('a Meta component', () => {
      expect(wrapper).toContainMatchingElement('Meta');
    });

    it('a PageBackdrop component', () => {
      expect(wrapper).toContainMatchingElement('PageBackdrop');
    });

    it('an AnchorButton component', () => {
      expect(wrapper).toContainMatchingElement('AnchorButton');
    });
  });

  it('should pass the correct data to the Shell component', () => {
    expect(shell.prop('logoSrc')).toBe(logoSrc);
    expect(shell.prop('isSearch')).toBe(false);
    expect(shell.prop('isListing')).toBe(false);
  });

  it('should pass the correct data to the Meta component', () => {
    expect(meta.prop('logoSrc')).toBe(logoSrc);
    expect(meta.prop('title')).toBe(_l('Page not found'));
  });

  it('should pass the correct graphic name to the PageBackdrop component', () => {
    expect(pageBackdrop.prop('graphicName')).toBe('page-not-found');
  });

  it('should pass a link to the AnchorButton component', () => {
    expect(anchorButton.prop('link')).not.toBe(undefined);
  });

  it('should pass the correct class to the AnchorButton component', () => {
    expect(anchorButton.prop('className')).toBe('btn-home');
  });
});

