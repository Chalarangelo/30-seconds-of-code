import React from 'react';
import Paginator from 'molecules/paginator';
import { object } from '@storybook/addon-knobs';
import mdx from './docs.mdx';

export default {
  title: 'Molecules|Paginator',
  component: Paginator,
  parameters: {
    docs: {
      page: mdx,
    },
    jest: [
      'paginator',
    ],
  },
};

export const component = () => {
  const paginator = object('paginator', {
    pageNumber: 3,
    totalPages: 7,
    baseUrl: '/list',
  });

  return (
    <Paginator paginator={ paginator } />
  );
};
