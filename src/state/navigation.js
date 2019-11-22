// Default state
const initialState = {
  lastPageTitle: 'Home',
  lastPageUrl: '/',
};

// Actions
const PUSH_NEW_PAGE = 'PUSH_NEW_PAGE';
export const pushNewPage = (pageTitle, pageUrl) => ({
  type: PUSH_NEW_PAGE,
  pageTitle,
  pageUrl,
});

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
  case PUSH_NEW_PAGE:
    return {
      ...state,
      lastPageTitle: action.pageTitle,
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
