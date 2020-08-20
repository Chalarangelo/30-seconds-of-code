/* eslint-disable react/prop-types */
import React from 'react';
import { render } from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer as reducer } from 'state';

export const renderConnected = (
  ui, {
    initialState = {},
    store = createStore(reducer, initialState),
    ...renderOptions
  } = {},
  renderer = render
) => {
  const Wrapper = ({ children }) => (
    <Provider store={ store }>{ children }</Provider>
  );
  const utils = renderer(ui, { wrapper: Wrapper, ...renderOptions});
  return {
    ...utils,
    store,
    rerenderConnected: (el, newState = initialState) =>
      renderConnected(
        el,
        {
          initialState: newState,
          store,
          ...renderOptions,
        },
        utils.renderer
      ),
  };
};
