import React from 'react';
import { Provider } from 'react-redux';
import { createStore as reduxCreateStore } from 'redux';
import rootReducer from 'state';
import Shell from 'organisms/shell';
import { object } from '@storybook/addon-knobs';
import mdx from './docs.mdx';

const createStore = () => reduxCreateStore(rootReducer);

export default {
  title: 'Organisms|Shell',
  component: Shell,
  parameters: {
    docs: {
      page: mdx,
    },
    jest: [
      'shell',
    ],
  },
};

export const component = () => {


  return (
    <Provider store={ createStore() }>
      <Shell>
        hiya
      </Shell>
    </Provider>
  );
};
