import React from 'react';
import { Provider } from 'react-redux';
import createStore from 'state';
import ListingPage from 'templates/listingPage';
import mdx from './docs.mdx';

const store = createStore();

export default {
  title: 'Templates|ListingPage',
  component: ListingPage,
  parameters: {
    docs: {
      page: mdx,
    },
    jest: [
      'listingPage',
    ],
  },
};

export const component = () => {
  const logoSrc = '/assets/logo.png';
  const paginator = {
    totalPages: 7,
    pageNumber: 4,
    baseUrl: '/list',
  };
  const snippetList = [
    {
      title: 'compose',
      language: 'JavaScript',
      tags: {
        primary: 'function',
        all: ['function', 'recursion'],
      },
      expertise: 'intermediate',
      html: {
        description: '<p>Performs right-to-left function composition.</p>',
      },
      url: 'snippets/compose',
    },
  ];
  const listingName = 'Snippet list';

  return (
    <Provider store={ store }>
      <ListingPage
        pageContext={ { logoSrc, snippetList, paginator, listingName } }
      />
    </Provider>
  );
};
