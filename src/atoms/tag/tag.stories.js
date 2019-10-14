import React from 'react';
import Tag from 'atoms/tag';
import { text } from '@storybook/addon-knobs';
import mdx from './docs.mdx';

export default {
  title: 'Atoms|Tag',
  component: Tag,
  parameters: {
    docs: {
      page: mdx,
    },
    jest: [
      'tag',
    ],
  },
};

export const component = () => {
  const name = text('name', 'array');

  return (
    <Tag name={ name } />
  );
};
