import createStateProvider from './utils';

const initialState = {
  lastPageUrl: '/',
};

const persistKey = 'persist:30-sec-app@navigation';

export const actionTypes = {
  pushNewPage: 'pushNewPage',
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.pushNewPage:
      return {
        ...state,
        lastPageUrl: action.pageUrl,
      };
    default:
      return state;
  }
};

const {
  StateProvider: NavigationProvider,
  useState: useNavigationState,
  useDispatch: useNavigationDispatch,
  useStateDispatch: useNavigation,
} = createStateProvider({
  initialState,
  persistKey,
  reducer,
  stateContextName: 'NavigationState',
  dispatchContextName: 'NavigationDispatch',
});

export {
  NavigationProvider,
  useNavigationState,
  useNavigationDispatch,
  useNavigation,
};
