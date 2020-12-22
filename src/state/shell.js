/** Checks if the client is a bot */
const isBot = () =>
  typeof navigator !== 'undefined' &&
  typeof navigator.userAgent !== 'undefined' &&
  /bot|google|baidu|bing|msn|duckduckbot|teoma|slurp|yandex/i.test(
    navigator.userAgent
  );

// Default state
const initialState = {
  isDarkMode: undefined,
  cacheKey: process.env.CACHE_KEY,
  newCacheKey: process.env.CACHE_KEY,
  isBot: isBot(),
  acceptsCookies: undefined,
};

// Actions
const TOGGLE_DARKMODE = 'TOGGLE_DARKMODE';
const TOGGLE_GITHUB_LINKS = 'TOGGLE_GITHUB_LINKS';
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

// Persistence configuration
export const persistConfig = {
  key: 'shell',
  blacklist: ['newCacheKey', 'isBot'],
};
