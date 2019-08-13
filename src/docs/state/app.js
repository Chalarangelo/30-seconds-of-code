// Defalt state
const initialState = {
  isDarkMode: false,
  lastPageTitle: 'Home',
  lastPageUrl: '/',
  searchQuery: '',
};

// Actions
const TOGGLE_DARKMODE = 'TOGGLE_DARKMODE';
const PUSH_NEW_PAGE = 'PUSH_NEW_PAGE';
const PUSH_NEW_QUERY = 'PUSH_NEW_QUERY';
export const toggleDarkMode = isDarkMode => ({
  type: TOGGLE_DARKMODE,
  isDarkMode,
});
export const pushNewPage = (pageTitle, pageUrl) => ({
  type: PUSH_NEW_PAGE,
  pageTitle,
  pageUrl,
});
export const pushNewQuery = query => ({
  type: PUSH_NEW_QUERY,
  query,
});

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_DARKMODE:
      return {
        ...state,
        isDarkMode: action.isDarkMode,
      };
    case PUSH_NEW_PAGE:
      return {
        ...state,
        lastPageTitle: action.pageTitle,
        lastPageUrl: action.pageUrl,
      };
    case PUSH_NEW_QUERY:
      return {
        ...state,
        searchQuery: action.query,
      };
    default:
      return state;
  }
};
