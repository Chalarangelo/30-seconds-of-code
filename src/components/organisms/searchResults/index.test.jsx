import { cleanup } from '@testing-library/react';
import { renderWithContext } from 'test/utils';
import SearchResults from './index';
import SnippetFactory from 'test/fixtures/factories/snippet';

describe('<SearchResults />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = renderWithContext(
      <SearchResults
        recommendations={{
          title: 'Recommended snippets',
          items: SnippetFactory.createMany('PreviewSnippet', 3),
        }}
      />,
      {
        initialState: {
          search: {
            searchQuery: '',
            searchIndex: SnippetFactory.createMany('PreviewSnippet', 3),
            searchResults: [],
            filteredResults: [],
            availableFilters: [],
          },
        },
      }
    ).container;
  });

  afterEach(cleanup);

  it('should render an empty state', () => {
    expect(wrapper.querySelectorAll('.recommendation-list-title')).toHaveLength(
      1
    );
  });

  describe('with recommended snippets', () => {
    beforeEach(() => {
      wrapper = renderWithContext(
        <SearchResults
          recommendations={{
            title: 'Recommended snippets',
            items: SnippetFactory.createMany('PreviewSnippet', 3),
          }}
        />,
        {
          initialState: {
            search: {
              searchQuery: '',
              searchIndex: SnippetFactory.createMany('PreviewSnippet', 3),
              searchResults: [],
              filteredResults: [],
              availableFilters: [],
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
    it('should render an empty state', () => {
      expect(
        wrapper.querySelectorAll('.recommendation-list-title')
      ).toHaveLength(1);
    });
  });

  describe('with no results', () => {
    beforeEach(() => {
      wrapper = renderWithContext(
        <SearchResults
          recommendations={{
            title: 'Recommended snippets',
            items: SnippetFactory.createMany('PreviewSnippet', 3),
          }}
        />,
        {
          initialState: {
            search: {
              searchQuery: 'impossiblestringtofindintheindex',
              searchIndex: SnippetFactory.createMany('PreviewSnippet', 3),
              searchResults: [],
              filteredResults: [],
              availableFilters: [],
            },
          },
        }
      ).container;
    });

    it('should render an empty state', () => {
      expect(
        wrapper.querySelectorAll('.recommendation-list-title')
      ).toHaveLength(1);
    });
  });

  describe('with results', () => {
    beforeEach(() => {
      const snippetList = SnippetFactory.createMany('PreviewSnippet', 3);
      wrapper = renderWithContext(
        <SearchResults
          recommendations={{
            title: 'Recommended snippets',
            items: SnippetFactory.createMany('PreviewSnippet', 3),
          }}
        />,
        {
          initialState: {
            search: {
              searchQuery: snippetList[0].tags.split(', ')[1],
              searchIndex: snippetList,
              searchResults: [snippetList[0]],
              filteredResults: [snippetList[0]],
              availableFilters: ['All', 'Snippets', 'Articles'],
            },
          },
        }
      ).container;
    });

    it('should render a PageTitle', () => {
      expect(wrapper.querySelectorAll('.page-title')).toHaveLength(1);
    });

    it('should render filters', () => {
      expect(wrapper.querySelectorAll('.listing-chips')).toHaveLength(1);
      expect(wrapper.querySelectorAll('li .btn')).toHaveLength(3);
    });

    it('should render a PreviewCard', () => {
      expect(
        wrapper.querySelectorAll('.list-card').length
      ).toBeGreaterThanOrEqual(1);
    });
  });
});
