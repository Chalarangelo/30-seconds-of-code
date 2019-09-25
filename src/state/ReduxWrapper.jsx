import React from 'react';
import { Provider } from 'react-redux';
import { createStore as reduxCreateStore } from 'redux';
import rootReducer from '.';

const createStore = () => reduxCreateStore(rootReducer);

// ===================================================
// Wrapper for Gatsby
// ===================================================
/* eslint-disable-next-line */
const ReduxWrapper = ({ element }) => (
  <Provider store={ createStore() }>{ element }</Provider>
);

export default ReduxWrapper;
