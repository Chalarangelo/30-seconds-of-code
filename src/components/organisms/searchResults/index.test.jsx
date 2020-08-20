import React from 'react';
import { cleanup } from '@testing-library/react';
import { renderConnected } from 'test/utils';
import SearchResults from './index';
import { initializeIndex, searchByKeyphrase, pushNewQuery } from 'state/search';
import { previewSnippet, previewBlogSnippet } from 'fixtures/snippets';

describe('<SearchResults />', () => {
  let wrapper, store, rerender;

  beforeEach(() => {
    let utils = renderConnected(<SearchResults />);
    store = utils.store;
    rerender = utils.rerenderConnected;
    store.dispatch(initializeIndex([previewBlogSnippet, previewSnippet]));
    wrapper = rerender(<SearchResults />).container;
  });

  afterEach(cleanup);

  it('should render properly', () => {
    expect(wrapper.querySelectorAll('.page-graphic')).toHaveLength(1);
  });

  describe('with recommended snippets', () => {

    beforeEach(() => {
      wrapper = rerender(
        <SearchResults recommendedSnippets={ [previewSnippet] }/>
      ).container;
    });

    it('should render the recommended snippets', () => {
      expect(wrapper.querySelectorAll('.recommendation-list')).toHaveLength(1);
    });
  });

  describe('with no search query', () => {
    it('should render the correct page graphic', () => {
      expect(wrapper.querySelectorAll('.page-graphic.search-empty')).toHaveLength(1);
    });
  });

  describe('with no results', () => {

    beforeEach(() => {
      store.dispatch(pushNewQuery('impossiblestringtofindintheindex'));
      store.dispatch(searchByKeyphrase('impossiblestringtofindintheindex', [previewBlogSnippet, previewSnippet]));
      wrapper = rerender(<SearchResults />).container;
    });

    it('should render the correct page graphic', () => {
      expect(wrapper.querySelectorAll('.page-graphic.search-no-results')).toHaveLength(1);
    });
  });

  describe('with results', () => {

    beforeEach(() => {
      store.dispatch(pushNewQuery(previewSnippet.primaryTag));
      store.dispatch(searchByKeyphrase(previewSnippet.primaryTag, [previewBlogSnippet, previewSnippet]));
      wrapper = rerender(<SearchResults />).container;
    });

    it('should render a PageTitle', () => {
      expect(wrapper.querySelectorAll('.page-title')).toHaveLength(1);
    });

    it('should render a PreviewCard', () => {
      expect(wrapper.querySelectorAll('.preview-card').length).toBeGreaterThanOrEqual(1);
    });
  });
});
