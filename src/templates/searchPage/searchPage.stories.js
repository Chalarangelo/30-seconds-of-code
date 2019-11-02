import React from 'react';
import { Provider } from 'react-redux';
import createStore from 'state';
import SearchPage from 'templates/searchPage';
import mdx from './docs.mdx';

const store = createStore();

export default {
  title: 'Templates|SearchPage',
  component: SearchPage,
  parameters: {
    docs: {
      page: mdx,
    },
    jest: [
      'searchPage',
    ],
  },
};

export const component = () => {
  return (
    <Provider store={ store }>
      <SearchPage
        pageContext={ {logoSrc: '/30s-icon.png'} }
      />
    </Provider>
  );
};
