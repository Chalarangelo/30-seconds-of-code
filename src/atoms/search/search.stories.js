import React from 'react';
import Search from 'atoms/search';
import { text } from '@storybook/addon-knobs';
import { withDesign } from 'storybook-addon-designs';
import mdx from './docs.mdx';

export default {
  title: 'Atoms|Search',
  component: Search,
  decorators: [
    withDesign,
  ],
  parameters: {
    docs: {
      page: mdx,
    },
    design: {
      name: 'search',
      type: 'figma',
      url: 'https://www.figma.com/file/oY0oRyqDxQZMeMqG4BSwrf/30-seconds-web?node-id=235%3A59',
    },
    jest: [
      'search',
    ],
  },
};

export const component = () => {
  const defaultValue = text('defaultValue', '');
  const className = text('className', '');
  const id = text('id', '');

  return (
    <Search
      setSearchQuery={ () => {} }
      className={ className }
      id={ id }
      defaultValue={ defaultValue }
    />
  );
};
