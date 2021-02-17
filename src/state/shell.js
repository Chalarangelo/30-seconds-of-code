import createStateProvider from './utils';

/** Checks if the client is a bot */
const isBot = () =>
  typeof navigator !== 'undefined' &&
  typeof navigator.userAgent !== 'undefined' &&
  /bot|google|baidu|bing|msn|duckduckbot|teoma|slurp|yandex/i.test(
    navigator.userAgent
  );

const initialState = {
  isDarkMode: undefined,
  cacheKey: process.env.CACHE_KEY,
  isBot: isBot(),
  acceptsCookies: undefined,
};

const persistKey = 'persist:30-sec-app@shell';

export const actionTypes = {
  toggleDarkMode: 'toggleDarkMode',
  decideCookies: 'decideCookies',
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.toggleDarkMode:
      return {
        ...state,
        isDarkMode: action.isDarkMode,
      };
    case actionTypes.decideCookies:
      return {
        ...state,
        acceptsCookies: action.acceptsCookies,
      };
    default:
      return state;
  }
};

const {
  StateProvider: ShellProvider,
  useState: useShellState,
  useDispatch: useShellDispatch,
  useStateDispatch: useShell,
} = createStateProvider({
  initialState,
  persistKey,
  reducer,
  stateContextName: 'ShellState',
  dispatchContextName: 'ShellDispatch',
});

export { ShellProvider, useShellState, useShellDispatch, useShell };
