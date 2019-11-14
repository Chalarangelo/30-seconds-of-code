import React from 'react';
import { Provider } from 'react-redux';
import createStore from 'state';
import AboutPage from 'templates/aboutPage';
import mdx from './docs.mdx';

const store = createStore();

export default {
  title: 'Templates|AboutPage',
  component: AboutPage,
  parameters: {
    docs: {
      page: mdx,
    },
    jest: [
      'aboutPage',
    ],
  },
};

export const component = () => {
  return (
    <Provider store={ store }>
      <AboutPage
        pageContext={ {logoSrc: '/30s-icon.png'} }
      />
    </Provider>
  );
};
