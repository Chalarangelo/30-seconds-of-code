import { cleanup } from '@testing-library/react';
import { renderWithContext } from 'test/utils';
import SearchResults from './index';
import SnippetFactory from 'test/fixtures/factories/snippet';

describe('<SearchResults />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = renderWithContext(<SearchResults />, {
      initialState: {
        search: {
          searchQuery: '',
          searchIndex: SnippetFactory.createMany('PreviewSnippet', 3),
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
        <SearchResults
          recommendedSnippets={SnippetFactory.createMany('PreviewSnippet', 3)}
        />,
        {
          initialState: {
            search: {
              searchQuery: '',
              searchIndex: SnippetFactory.createMany('PreviewSnippet', 3),
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
      expect(wrapper.querySelectorAll('.page-graphic')).toHaveLength(1);
    });
  });

  describe('with no results', () => {
    beforeEach(() => {
      wrapper = renderWithContext(<SearchResults />, {
        initialState: {
          search: {
            searchQuery: 'impossiblestringtofindintheindex',
            searchIndex: SnippetFactory.createMany('PreviewSnippet', 3),
            searchResults: [],
          },
        },
      }).container;
    });

    it('should render the correct page graphic', () => {
      expect(wrapper.querySelectorAll('.page-graphic')).toHaveLength(1);
    });
  });

  describe('with results', () => {
    beforeEach(() => {
      const snippetList = SnippetFactory.createMany('PreviewSnippet', 3);
      wrapper = renderWithContext(<SearchResults />, {
        initialState: {
          search: {
            searchQuery: snippetList[0].primaryTag,
            searchIndex: snippetList,
            searchResults: [snippetList[0]],
          },
        },
      }).container;
    });

    it('should render a PageTitle', () => {
      expect(wrapper.querySelectorAll('.page-title')).toHaveLength(1);
    });

    it('should render a PreviewCard', () => {
      expect(
        wrapper.querySelectorAll('.list-card').length
      ).toBeGreaterThanOrEqual(1);
    });
  });
});
