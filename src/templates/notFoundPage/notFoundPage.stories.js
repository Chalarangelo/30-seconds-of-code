import React from 'react';
import { Provider } from 'react-redux';
import createStore from 'state';
import NotFoundPage from 'templates/notFoundPage';
import mdx from './docs.mdx';

const store = createStore();

export default {
  title: 'Templates|NotFoundPage',
  component: NotFoundPage,
  parameters: {
    docs: {
      page: mdx,
    },
    jest: [
      'notFoundPage',
    ],
  },
};

export const component = () => {
  return (
    <Provider store={ store }>
      <NotFoundPage
        pageContext={ { logoSrc: '/30s-icon.png' } }
      />
    </Provider>
  );
};
