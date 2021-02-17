import createStateProvider from './utils';
import { quickParseTokens as tokenize } from 'utils/search';

const initialState = {
  searchQuery: '',
  searchIndex: [],
  searchResults: [],
  searchTimestamp: `${new Date()}`,
};

const persistKey = 'persist:30-sec-app@search';

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
        .sort((a, b) => b.score - a.score)
        .slice(0, 50);
    }
  }
  return results;
};

export const actionTypes = {
  pushNewQuery: 'pushNewQuery',
  initializeIndex: 'initializeIndex',
  searchByKeyphrase: 'searchByKeyphrase',
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
    case actionTypes.searchByKeyphrase:
      return {
        ...state,
        searchResults: searchByKeyphrase(action.keyphrase, state.searchIndex),
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
  persistKey,
  reducer,
  stateContextName: 'SearchState',
  dispatchContextName: 'SearchDispatch',
});

export { SearchProvider, useSearchState, useSearchDispatch, useSearch };
