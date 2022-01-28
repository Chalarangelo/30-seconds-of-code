import { createContext, useContext, useReducer, useEffect } from 'react';

/**
 * Creates all the necessary components for a state context provider.
 */
const createStateProvider = ({
  initialState = {},
  persistKey = null,
  reducer = state => state,
  stateContextName = 'StateContext',
}) => {
  // Persisted initializer
  const initializeState = () => {
    if (typeof window === 'undefined' || persistKey === null)
      return initialState;
    try {
      const persistedData = window.localStorage.getItem(persistKey);
      return JSON.parse(persistedData) || initialState;
    } catch (e) {
      return initialState;
    }
  };

  // Contexts
  const StateContext = createContext();
  StateContext.displayName = stateContextName;

  // Hooks
  const useState = () => {
    const context = useContext(StateContext);
    return context.state;
  };
  const useDispatch = () => {
    const context = useContext(StateContext);
    return context.dispatch;
  };
  const useStateDispatch = () => {
    const context = useContext(StateContext);
    return [context.state, context.dispatch];
  };

  const StateProvider = ({ children, initialState }) => {
    const [state, dispatch] = useReducer(
      reducer,
      initialState ? initialState : initializeState()
    );

    useEffect(() => {
      if (persistKey === null) return;
      try {
        window.localStorage.setItem(persistKey, JSON.stringify(state));
      } catch (e) {
        console.warn(e);
      }
    }, [state]);

    return (
      <StateContext.Provider value={{ state, dispatch }}>
        {children}
      </StateContext.Provider>
    );
  };

  return {
    StateProvider,
    useState,
    useDispatch,
    useStateDispatch,
  };
};

export default createStateProvider;
