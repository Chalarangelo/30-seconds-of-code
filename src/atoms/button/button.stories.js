import React from 'react';
import Button from 'atoms/button';
import { text } from '@storybook/addon-knobs';
import { withDesign } from 'storybook-addon-designs';
import mdx from './docs.mdx';

export default {
  title: 'Atoms|Button',
  component: Button,
  decorators: [
    withDesign,
  ],
  parameters: {
    docs: {
      page: mdx,
    },
    design: {
      name: 'button',
      type: 'figma',
      url: 'https://www.figma.com/file/oY0oRyqDxQZMeMqG4BSwrf/30-seconds-web?node-id=228%3A0',
    },
    jest: [
      'button',
    ],
  },
};

export const component = () => {
  const children = text('children (string-only)', 'Click me!');
  const className = text('className', '');
  return (
    <Button className={ className }>{ children }</Button>
  );
};
