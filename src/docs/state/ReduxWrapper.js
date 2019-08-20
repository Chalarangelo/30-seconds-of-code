import React from 'react';
import { Provider } from 'react-redux';
import { createStore as reduxCreateStore } from 'redux';
import rootReducer from '.';

const createStore = () => reduxCreateStore(rootReducer);

// ===================================================
// Wrapper for Gatsby
// ===================================================
export default ({ element }) => (
  <Provider store={createStore()}>{element}</Provider>
);
