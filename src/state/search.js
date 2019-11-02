// Defalt state
const initialState = {
  initialized: false,
  searchQuery: '',
  searchIndex: [],
  searchResults: [],
};

// Actions
const PUSH_NEW_QUERY = 'PUSH_NEW_QUERY';
const START_INDEX_FETCH = 'START_INDEX_FETCH';
const FINISH_INDEX_FETCH = 'FINISH_INDEX_FETCH';
const SEARCH_BY_KEYPHRASE = 'SEARCH_BY_KEYPHRASE';

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
// TODO: Use a better search strategy
export const searchByKeyphrase = (keyphrase, searchIndex) => {
  let q = keyphrase.toLowerCase();
  let results = searchIndex;
  if (q.trim().length) {
    results = searchIndex.filter(
      snippet =>
        snippet.primaryTag.toLowerCase().indexOf(q) !== -1 ||
        snippet.title.toLowerCase().indexOf(q) !== -1
    );
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
  default:
    return state;
  }
};
