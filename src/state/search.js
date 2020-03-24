import { searchIndexingEngine as tokenize } from 'engines';

// Default state
const initialState = {
  initialized: false,
  searchQuery: '',
  searchIndex: [],
  searchResults: [],
  searchTimestamp: `${new Date()}`,
};

// Actions
const PUSH_NEW_QUERY = 'PUSH_NEW_QUERY';
const START_INDEX_FETCH = 'START_INDEX_FETCH';
const FINISH_INDEX_FETCH = 'FINISH_INDEX_FETCH';
const SEARCH_BY_KEYPHRASE = 'SEARCH_BY_KEYPHRASE';
const KEYPHRASE_TOO_SHORT = 'KEYPHRASE_TOO_SHORT';

export const pushNewQuery = query => ({
  type: PUSH_NEW_QUERY,
  query,
});

export const startIndexFetch = () => ({
  type: START_INDEX_FETCH,
});

export const finishIndexFetch = index => ({
  type: FINISH_INDEX_FETCH,
  index,
});
export const searchByKeyphrase = (keyphrase, searchIndex) => {
  let q = keyphrase.toLowerCase().trim();
  if (q.length <= 1) {
    return {
      type: KEYPHRASE_TOO_SHORT,
    };
  }
  let results = [];
  if (q.length) {
    let t = tokenize(q);
    if (t.length) {
      results = searchIndex
        .map(snippet => {
          snippet.score = snippet.title.toLowerCase().trim() === q
            ? 1.01
            : t.reduce((acc, tkn) => snippet.searchTokens.indexOf(tkn) !== -1 ? acc + 1 : acc, 0) / t.length;
          return snippet;
        })
        .filter(snippet => snippet.score > 0.3)
        .sort((a, b) => b.score - a.score).slice(0, 50);
    }
  }
  return {
    type: SEARCH_BY_KEYPHRASE,
    results,
  };
};

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
  case PUSH_NEW_QUERY:
    return {
      ...state,
      searchTimestamp: `${new Date()}`,
      searchQuery: action.query,
    };
  case START_INDEX_FETCH:
    return {
      ...state,
      initialized: false,
    };
  case FINISH_INDEX_FETCH:
    return {
      ...state,
      searchIndex: action.index,
      initialized: true,
    };
  case SEARCH_BY_KEYPHRASE:
    return {
      ...state,
      searchResults: action.results,
    };
  case KEYPHRASE_TOO_SHORT:
    return state;
  default:
    return state;
  }
};

// Persistence configuration
export const persistConfig = {
  key: 'search',
  blacklist: ['initialized'],
};
