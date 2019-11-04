import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import createStore from '.';

const { persistor, store } = createStore();

// ===================================================
// Wrapper for Gatsby
// ===================================================
/* eslint-disable-next-line */
const ReduxWrapper = ({ element }) => (
  <Provider store={ store }>
    <PersistGate loading={ null } persistor={ persistor }>
      { element }
    </PersistGate>
  </Provider>
);

export default ReduxWrapper;
