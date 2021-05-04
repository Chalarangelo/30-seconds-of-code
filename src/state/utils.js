import { createContext, useContext, useReducer, useEffect } from 'react';

/**
 * Creates all the necessary components for a state context provider.
 */
const createStateProvider = ({
  initialState = {},
  persistKey = null,
  reducer = state => state,
  stateContextName = 'StateContext',
  dispatchContextName = 'DispatchContext',
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
  const DispatchContext = createContext();
  StateContext.displayName = stateContextName;
  DispatchContext.displayName = dispatchContextName;

  // Hooks
  const useState = () => {
    const context = useContext(StateContext);
    return context;
  };
  const useDispatch = () => {
    const context = useContext(DispatchContext);
    return context;
  };
  const useStateDispatch = () => {
    return [useState(), useDispatch()];
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
      <StateContext.Provider value={state}>
        <DispatchContext.Provider value={dispatch}>
          {children}
        </DispatchContext.Provider>
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
