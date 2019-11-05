import React from 'react';
import SnippetList from 'molecules/snippetList';
import mdx from './docs.mdx';

export default {
  title: 'Organisms|SnippetList',
  component: SnippetList,
  parameters: {
    docs: {
      page: mdx,
    },
    jest: [
      'snippetList',
    ],
  },
};

export const component = () => {
  return (
    <p>This story is a stub.</p>
  );
};
