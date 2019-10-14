import React from 'react';
import Card from 'atoms/card';
import { text } from '@storybook/addon-knobs';
import mdx from './docs.mdx';

export default {
  title: 'Atoms|Card',
  component: Card,
  parameters: {
    docs: {
      page: mdx,
    },
    jest: [
      'card',
    ],
  },
};

export const component = () => {
  const className = text('className', '');
  const children = text('children (string only)', 'This is a card');

  return (
    <Card className={ className }>
      { children }
    </Card>
  );
};
