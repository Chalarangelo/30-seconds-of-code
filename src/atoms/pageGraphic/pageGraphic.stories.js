import React from 'react';
import PageGraphic from 'atoms/pageGraphic';
import { text } from '@storybook/addon-knobs';
import mdx from './docs.mdx';

export default {
  title: 'Atoms|PageGraphic',
  component: PageGraphic,
  parameters: {
    docs: {
      page: mdx,
    },
    jest: [
      'pageGraphic',
    ],
  },
};

export const component = () => {
  const className = text('className', 'search-empty');
  const children = text('children (text-only)', 'There are no search results');

  return (
    <PageGraphic className={ className }>
      { children }
    </PageGraphic>
  );
};
