import createStateProvider from './utils';
import { quickParseTokens as tokenize } from 'utils/search';

const SEARCH_RESULTS_COUNT = 60;

const initialState = {
  searchQuery: '',
  searchIndex: [],
  searchResults: [],
  searchTimestamp: `${new Date()}`,
};

const searchByKeyphrase = (keyphrase, searchIndex) => {
  let q = keyphrase.toLowerCase().trim();
  if (q.length <= 1) return [];
  let results = [];
  if (q.length) {
    let t = tokenize(q);
    if (t.length && searchIndex && searchIndex.length) {
      results = searchIndex
        .map(snippet => {
          const normalizedSnippetTitle = snippet.title.toLowerCase().trim();
          snippet.score =
            normalizedSnippetTitle === q
              ? 1.01
              : t.reduce(
                  (acc, tkn) =>
                    normalizedSnippetTitle.indexOf(tkn) !== -1 ||
                    snippet.searchTokens.indexOf(tkn) !== -1
                      ? acc + 1
                      : acc,
                  0
                ) / t.length;
          return snippet;
        })
        .filter(snippet => snippet.score > 0.3)
        .sort((a, b) => b.score - a.score);
    }
  }
  return results;
};

const filterResultsByType = (type, searchResults) => {
  switch (type) {
    case 'collections':
      return searchResults.filter(r => !r.expertise);
    case 'snippets':
      return searchResults.filter(
        r => r.expertise && r.expertise.toLowerCase() !== 'article'
      );
    case 'articles':
      return searchResults.filter(
        r => r.expertise && r.expertise.toLowerCase() === 'article'
      );
    default:
      return searchResults;
  }
};

export const actionTypes = {
  pushNewQuery: 'pushNewQuery',
  initializeIndex: 'initializeIndex',
  searchByKeyphrase: 'searchByKeyphrase',
  filterResultsByType: 'filterResultsByType',
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.pushNewQuery:
      return {
        ...state,
        searchTimestamp: `${new Date()}`,
        searchQuery: action.query,
      };
    case actionTypes.initializeIndex:
      return {
        ...state,
        searchIndex: action.index,
      };
    case actionTypes.searchByKeyphrase: {
      const searchResults = searchByKeyphrase(
        action.keyphrase,
        state.searchIndex
      );
      const availableFilters = {
        All: true,
        Snippets: searchResults.some(
          r => r.expertise && r.expertise.toLowerCase() !== 'article'
        ),
        Articles: searchResults.some(
          r => r.expertise && r.expertise.toLowerCase() === 'article'
        ),
        Collections: searchResults.some(r => !r.expertise),
      };
      return {
        ...state,
        searchResults,
        filteredResults: searchResults.slice(0, SEARCH_RESULTS_COUNT),
        typeFilter: 'all',
        availableFilters: Object.entries(availableFilters)
          .filter(([key, value]) => value)
          .map(([key]) => key),
      };
    }
    case actionTypes.filterResultsByType:
      return {
        ...state,
        filteredResults: filterResultsByType(
          action.resultType,
          state.searchResults
        ).slice(0, SEARCH_RESULTS_COUNT),
        typeFilter: action.resultType,
      };
    default:
      return state;
  }
};

const {
  StateProvider: SearchProvider,
  useState: useSearchState,
  useDispatch: useSearchDispatch,
  useStateDispatch: useSearch,
} = createStateProvider({
  initialState,
  reducer,
  stateContextName: 'SearchState',
  dispatchContextName: 'SearchDispatch',
});

export { SearchProvider, useSearchState, useSearchDispatch, useSearch };
