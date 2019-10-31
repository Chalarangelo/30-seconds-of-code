import React from 'react';
import SimpleCard from 'molecules/simpleCard';
import { text } from '@storybook/addon-knobs';
import mdx from './docs.mdx';

export default {
  title: 'Molecules|SimpleCard',
  component: SimpleCard,
  parameters: {
    docs: {
      page: mdx,
    },
    jest: [
      'simpleCard',
    ],
  },
};

export const component = () => {
  const title = text('title', 'Lorem ipsum');
  const children = text('children (text-only)', 'Lorem ipsum dolor sit amet');

  return (
    <SimpleCard title={ title }>
      { children }
    </SimpleCard>
  );
};
