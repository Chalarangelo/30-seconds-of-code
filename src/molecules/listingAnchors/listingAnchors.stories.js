import React from 'react';
import ListingAnchors from 'molecules/listingAnchors';
import { object } from '@storybook/addon-knobs';
import mdx from './docs.mdx';

export default {
  title: 'Molecules|ListingAnchors',
  component: ListingAnchors,
  parameters: {
    docs: {
      page: mdx,
    },
    jest: [
      'listingAnchors',
    ],
  },
};

export const component = () => {
  const items = object('items', [
    {
      name: 'My list',
      link: { internal: true, url: '/my-list'},
      count: '200 snippets',
    },
    {
      name: 'My other list',
      link: { internal: true, url: '/my-other-list'},
      count: '34 snippets',
    },
  ]);

  return (
    <ListingAnchors items={ items } />
  );
};
