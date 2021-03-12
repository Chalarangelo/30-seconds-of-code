import React from 'react';
import { cleanup } from '@testing-library/react';
import { renderWithContext } from 'test/utils';
import SearchResults from './index';
import { previewSnippet, previewBlogSnippet } from 'fixtures/snippets';

describe('<SearchResults />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = renderWithContext(<SearchResults />, {
      initialState: {
        search: {
          searchQuery: '',
          searchIndex: [previewBlogSnippet, previewSnippet],
          searchResults: [],
        },
      },
    }).container;
  });

  afterEach(cleanup);

  it('should render properly', () => {
    expect(wrapper.querySelectorAll('.page-graphic')).toHaveLength(1);
  });

  describe('with recommended snippets', () => {
    beforeEach(() => {
      wrapper = renderWithContext(
        <SearchResults recommendedSnippets={[previewSnippet]} />,
        {
          initialState: {
            search: {
              searchQuery: '',
              searchIndex: [previewBlogSnippet, previewSnippet],
              searchResults: [],
            },
          },
        }
      ).container;
    });

    it('should render the recommended snippets', () => {
      expect(wrapper.querySelectorAll('.list-section')).toHaveLength(1);
    });
  });

  describe('with no search query', () => {
    it('should render the correct page graphic', () => {
      expect(
        wrapper.querySelectorAll('.page-graphic.search-empty')
      ).toHaveLength(1);
    });
  });

  describe('with no results', () => {
    beforeEach(() => {
      wrapper = renderWithContext(<SearchResults />, {
        initialState: {
          search: {
            searchQuery: 'impossiblestringtofindintheindex',
            searchIndex: [previewSnippet, previewBlogSnippet],
            searchResults: [],
          },
        },
      }).container;
    });

    it('should render the correct page graphic', () => {
      expect(
        wrapper.querySelectorAll('.page-graphic.search-no-results')
      ).toHaveLength(1);
    });
  });

  describe('with results', () => {
    beforeEach(() => {
      wrapper = renderWithContext(<SearchResults />, {
        initialState: {
          search: {
            searchQuery: previewSnippet.primaryTag,
            searchIndex: [previewSnippet, previewBlogSnippet],
            searchResults: [previewSnippet],
          },
        },
      }).container;
    });

    it('should render a PageTitle', () => {
      expect(wrapper.querySelectorAll('.page-title')).toHaveLength(1);
    });

    it('should render a PreviewCard', () => {
      expect(
        wrapper.querySelectorAll('.preview-card').length
      ).toBeGreaterThanOrEqual(1);
    });
  });
});
