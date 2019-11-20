import React from 'react';
import { Provider } from 'react-redux';
import createStore from 'state';
import CookiePage from 'templates/cookiePage';
import mdx from './docs.mdx';

const store = createStore();

export default {
  title: 'Templates|CookiePage',
  component: CookiePage,
  parameters: {
    docs: {
      page: mdx,
    },
    jest: [
      'cookiePage',
    ],
  },
};

export const component = () => {
  return (
    <Provider store={ store }>
      <CookiePage
        pageContext={ {logoSrc: '/30s-icon.png'} }
      />
    </Provider>
  );
};
