import React from 'react';
import Search from 'atoms/search';
import { text } from '@storybook/addon-knobs';
import mdx from './docs.mdx';

export default {
  title: 'Atoms|Search',
  component: Search,
  parameters: {
    docs: {
      page: mdx,
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
