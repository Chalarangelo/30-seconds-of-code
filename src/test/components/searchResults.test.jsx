import { cleanup } from '@testing-library/react';
import { renderWithContext } from 'test/reactUtils';
import SearchResults from 'components/organisms/searchResults';
import { snippetList } from 'test/fixtures/snippet';

describe('<SearchResults />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = renderWithContext(
      <SearchResults
        recommendations={{
          title: 'Recommended snippets',
          items: snippetList,
        }}
      />,
      {
        initialState: {
          search: {
            searchQuery: '',
            searchIndex: snippetList,
            searchResults: [],
            filteredResults: [],
            availableFilters: [],
          },
        },
      }
    ).container;
  });

  afterEach(cleanup);

  it('renders an empty state', () => {
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
            items: snippetList,
          }}
        />,
        {
          initialState: {
            search: {
              searchQuery: '',
              searchIndex: snippetList,
              searchResults: [],
              filteredResults: [],
              availableFilters: [],
            },
          },
        }
      ).container;
    });

    it('renders correctly', () => {
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
            items: snippetList,
          }}
        />,
        {
          initialState: {
            search: {
              searchQuery: 'impossiblestringtofindintheindex',
              searchIndex: snippetList,
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
      wrapper = renderWithContext(
        <SearchResults
          recommendations={{
            title: 'Recommended snippets',
            items: snippetList,
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

    it('renders correctly', () => {
      expect(wrapper.querySelectorAll('.page-title')).toHaveLength(1);
      expect(wrapper.querySelectorAll('.listing-chips')).toHaveLength(1);
      expect(wrapper.querySelectorAll('li .btn')).toHaveLength(3);
      expect(
        wrapper.querySelectorAll('.list-card').length
      ).toBeGreaterThanOrEqual(1);
    });
  });
});
