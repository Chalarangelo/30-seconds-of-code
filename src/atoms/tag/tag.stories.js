import React from 'react';
import Tag from 'atoms/tag';
import { text } from '@storybook/addon-knobs';
import { withDesign } from 'storybook-addon-designs';
import mdx from './tag.mdx';

export default {
  title: 'Atoms|Tag',
  component: Tag,
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
