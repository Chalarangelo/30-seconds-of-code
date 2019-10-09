import React from 'react';
import Card from 'atoms/card';
import { text } from '@storybook/addon-knobs';
import { withDesign } from 'storybook-addon-designs';
import mdx from './docs.mdx';

export default {
  title: 'Atoms|Card',
  component: Card,
  decorators: [
    withDesign,
  ],
  parameters: {
    docs: {
      page: mdx,
    },
    design: {
      name: 'card',
      type: 'figma',
      url: 'https://www.figma.com/file/oY0oRyqDxQZMeMqG4BSwrf/30-seconds-web?node-id=312%3A0',
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
