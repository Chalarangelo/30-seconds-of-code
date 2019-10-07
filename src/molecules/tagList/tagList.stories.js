import React from 'react';
import TagList from 'molecules/tagList';
import { array } from '@storybook/addon-knobs';
import { withDesign } from 'storybook-addon-designs';
import mdx from './docs.mdx';

export default {
  title: 'Molecules|TagList',
  component: TagList,
  decorators: [
    withDesign,
  ],
  parameters: {
    docs: {
      page: mdx,
    },
    design: {
      name: 'tag',
      type: 'figma',
      url: 'https://www.figma.com/file/oY0oRyqDxQZMeMqG4BSwrf/30-seconds-web?node-id=193%3A0',
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
