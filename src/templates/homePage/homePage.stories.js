import React from 'react';
import { Provider } from 'react-redux';
import createStore from 'state';
import HomePage from 'templates/homePage';
import mdx from './docs.mdx';

const store = createStore();

export default {
  title: 'Templates|HomePage',
  component: HomePage,
  parameters: {
    docs: {
      page: mdx,
    },
    jest: [
      'homePage',
    ],
  },
};

export const component = () => {
  return (
    <Provider store={ store }>
      <HomePage
        pageContext={ {logoSrc: '/30s-icon.png'} }
      />
    </Provider>
  );
};
