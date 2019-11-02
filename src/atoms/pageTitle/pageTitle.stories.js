import React from 'react';
import PageTitle from 'atoms/pageTitle';
import { text } from '@storybook/addon-knobs';
import mdx from './docs.mdx';

export default {
  title: 'Atoms|PageTitle',
  component: PageTitle,
  parameters: {
    docs: {
      page: mdx,
    },
    jest: [
      'pageTitle',
    ],
  },
};

export const component = () => {
  const title = text('title', 'Page title');

  return (
    <PageTitle>
      { title }
    </PageTitle>
  );
};
