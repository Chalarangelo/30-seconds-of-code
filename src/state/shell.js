import cacheKey from '../../.build/cacheKey';

// Defalt state
const initialState = {
  isDarkMode: undefined,
  cacheKey,
  acceptsCookies: undefined,
};

// Actions
const TOGGLE_DARKMODE = 'TOGGLE_DARKMODE';
const ACCEPT_COOKIES = 'ACCEPT_COOKIES';
const DECLINE_COOKIES = 'DECLINE_COOKIES';

export const toggleDarkMode = isDarkMode => ({
  type: TOGGLE_DARKMODE,
  isDarkMode,
});

export const decideCookies = cookieConsent => ({
  type: cookieConsent ? ACCEPT_COOKIES : DECLINE_COOKIES,
});

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
  case TOGGLE_DARKMODE:
    return {
      ...state,
      isDarkMode: action.isDarkMode,
    };
  case ACCEPT_COOKIES:
    return {
      ...state,
      acceptsCookies: true,
    };
  case DECLINE_COOKIES:
    return {
      ...state,
      acceptsCookies: false,
    };
  default:
    return state;
  }
};
