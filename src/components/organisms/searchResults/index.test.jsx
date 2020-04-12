import React from 'react';
import { Provider } from 'react-redux';
import createStore from 'state';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import SearchResults from './index';
import { initializeIndex, searchByKeyphrase, pushNewQuery } from 'state/search';
import { previewSnippet, previewBlogSnippet } from 'fixtures/snippets';

configure({ adapter: new Adapter() });

const { store } = createStore();

describe('<SearchResults />', () => {
  let wrapper;

  beforeEach(() => {
    store.dispatch(initializeIndex([previewBlogSnippet, previewSnippet]));
    wrapper = mount(
      <Provider store={ store }>
        <SearchResults />
      </Provider>
    );
  });

  it('should render properly', () => {
    expect(wrapper).toContainMatchingElement('PageBackdrop');
  });

  describe('with recommended snippets', () => {

    beforeEach(() => {
      wrapper = mount(
        <Provider store={ store }>
          <SearchResults recommendedSnippets={ [previewSnippet] }/>
        </Provider>
      );
    });

    it('should render the recommended snippets', () => {
      expect(wrapper).toContainMatchingElement('RecommendationList');
    });
  });

  describe('with no search query', () => {
    it('should render the correct page graphic', () => {
      expect(wrapper.find('PageBackdrop').prop('graphicName')).toBe('search-empty');
    });
  });

  describe('with no results', () => {

    beforeEach(() => {
      store.dispatch(pushNewQuery('impossiblestringtofindintheindex'));
      store.dispatch(searchByKeyphrase('impossiblestringtofindintheindex', [previewBlogSnippet, previewSnippet]));
      wrapper = mount(
        <Provider store={ store }>
          <SearchResults />
        </Provider>
      );
    });

    it('should render the correct page graphic', () => {
      expect(wrapper.find('PageBackdrop').prop('graphicName')).toBe('search-no-results');
    });
  });

  describe('with results', () => {

    beforeEach(() => {
      store.dispatch(pushNewQuery(previewSnippet.primaryTag));
      store.dispatch(searchByKeyphrase(previewSnippet.primaryTag, [previewBlogSnippet, previewSnippet]));
      wrapper = mount(
        <Provider store={ store }>
          <SearchResults />
        </Provider>
      );
    });

    it('should render a PageTitle', () => {
      expect(wrapper).toContainMatchingElement('PageTitle');
    });

    it('should render a PreviewCard', () => {
      expect(wrapper).toContainMatchingElement('PreviewCard');
    });
  });
});
