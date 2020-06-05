import React from 'react';
import { Provider } from 'react-redux';
import createStore from 'state';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import cards from './index';
import { fullSnippet, fullCssSnippet, fullBlogSnippet } from 'fixtures/snippets';

configure({ adapter: new Adapter() });
console.warn = jest.fn();

const { store } = createStore();

describe('<SnippetCardWrapper />', () => {
  let wrapper;

  describe('standard snippet card template', () => {

    beforeAll(() => {
      const SnippetCard = cards['StandardSnippetCard'];
      wrapper = mount(
        <Provider store={ store }>
          <SnippetCard snippet={ fullSnippet } />
        </Provider>
      );
    });

    it('should render a StandardSnippetCard component', () => {
      expect(wrapper).toContainMatchingElement('SnippetCard');
    });
  });

  describe('css snippet card template', () => {

    beforeAll(() => {
      const SnippetCard = cards['CssSnippetCard'];
      wrapper = mount(
        <Provider store={ store }>
          <SnippetCard snippet={ fullCssSnippet }/>
        </Provider>
      );
    });

    it('should render a CssSnippetCard component', () => {
      expect(wrapper).toContainMatchingElement('SnippetCard');
    });
  });

  describe('blog snippet card template', () => {

    beforeAll(() => {
      const SnippetCard = cards['BlogSnippetCard'];
      wrapper = mount(
        <Provider store={ store }>
          <SnippetCard snippet={ fullBlogSnippet }/>
        </Provider>
      );
    });

    it('should render a BlogSnippetCard component', () => {
      expect(wrapper).toContainMatchingElement('SnippetCard');
    });
  });
});
