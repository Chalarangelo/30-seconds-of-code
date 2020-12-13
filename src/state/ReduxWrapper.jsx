import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import createStore from '.';
const { persistor, store } = createStore();

/**
 * Redux wrapper for Gatsby/React components.
 * @param {*} element - The element to be wrapped.
 */
/* eslint-disable-next-line */
const ReduxWrapper = ({ element }) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {element}
    </PersistGate>
  </Provider>
);

export default ReduxWrapper;
