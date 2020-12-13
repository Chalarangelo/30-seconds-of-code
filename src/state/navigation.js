// Default state
const initialState = {
  lastPageUrl: '/',
};

// Actions
const PUSH_NEW_PAGE = 'PUSH_NEW_PAGE';
export const pushNewPage = pageUrl => ({
  type: PUSH_NEW_PAGE,
  pageUrl,
});

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case PUSH_NEW_PAGE:
      return {
        ...state,
        lastPageUrl: action.pageUrl,
      };
    default:
      return state;
  }
};

// Persistence configuration
export const persistConfig = {
  key: 'navigation',
  blacklist: [''],
};
