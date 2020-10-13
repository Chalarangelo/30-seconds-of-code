import tokenize from 'engines/searchIndexingEngine';

// Default state
const initialState = {
  initialized: false,
  searchQuery: '',
  searchIndex: [],
  searchResults: [],
  searchTimestamp: `${new Date()}`,
  includeArchive: false,
};

// Actions
const PUSH_NEW_QUERY = 'PUSH_NEW_QUERY';
const INITIALIZE_INDEX = 'INITIALIZE_INDEX';
const SEARCH_BY_KEYPHRASE = 'SEARCH_BY_KEYPHRASE';
const KEYPHRASE_TOO_SHORT = 'KEYPHRASE_TOO_SHORT';
const TOGGLE_ARCHIVE_SEARCH = 'TOGGLE_ARCHIVE_SEARCH';

export const pushNewQuery = query => ({
  type: PUSH_NEW_QUERY,
  query,
});

export const initializeIndex = index => ({
  type: INITIALIZE_INDEX,
  index,
});

export const toggleArchiveSearch = searchArchive => ({
  type: TOGGLE_ARCHIVE_SEARCH,
  searchArchive,
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
    if (t.length && searchIndex && searchIndex.length) {
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
  case TOGGLE_ARCHIVE_SEARCH:
    return {
      ...state,
      includeArchive: action.searchArchive,
    };
  case PUSH_NEW_QUERY:
    return {
      ...state,
      searchTimestamp: `${new Date()}`,
      searchQuery: action.query,
    };
  case INITIALIZE_INDEX:
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
