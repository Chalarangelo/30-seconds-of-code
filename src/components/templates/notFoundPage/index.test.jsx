import React from 'react';
import { Provider } from 'react-redux';
import createStore from 'state';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import literals from 'lang/en/client/notFound';

import NotFoundPage from './index';

configure({ adapter: new Adapter() });
console.warn = jest.fn();

const { store } = createStore();

describe('<NotFoundPage />', () => {
  let wrapper, meta, pageBackdrop, anchorButton;

  beforeEach(() => {
    wrapper = mount(
      <Provider store={ store }>
        <NotFoundPage />
      </Provider>
    );
    meta = wrapper.find('Meta');
    pageBackdrop = wrapper.find('PageBackdrop');
    anchorButton = wrapper.find('a.btn.btn-home');
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

    it('an anchor element', () => {
      expect(wrapper).toContainMatchingElement('a.btn.btn-home');
    });
  });

  it('should pass the correct data to the Meta component', () => {
    expect(meta.prop('title')).toBe(literals.pageNotFound);
  });

  it('should pass the correct graphic name to the PageBackdrop component', () => {
    expect(pageBackdrop.prop('graphicName')).toBe('page-not-found');
  });

  it('should pass a link to the anchor button', () => {
    expect(anchorButton.prop('href')).not.toBe(undefined);
  });

  it('should pass the correct class to the anchor button', () => {
    expect(anchorButton.prop('className').indexOf('btn-home')).not.toBe(-1);
  });
});

