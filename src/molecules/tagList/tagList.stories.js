import React from 'react';
import TagList from 'molecules/tagList';
import { array } from '@storybook/addon-knobs';
import mdx from './docs.mdx';

export default {
  title: 'Molecules|TagList',
  component: TagList,
  parameters: {
    docs: {
      page: mdx,
    },
    jest: [
      'tagList',
    ],
  },
};

export const component = () => {
  const tags = array('tags', [ 'array', 'adapter', 'function' ]);

  return (
    <TagList tags={ tags } />
  );
};
