import React from 'react';
import Anchor from 'atoms/anchor';
import { text, boolean } from '@storybook/addon-knobs';
import { withDesign } from 'storybook-addon-designs';
import mdx from './docs.mdx';

export default {
  title: 'Atoms|Anchor',
  component: Anchor,
  decorators: [
    withDesign,
  ],
  parameters: {
    docs: {
      page: mdx,
    },
    design: {
      name: 'anchor',
      type: 'figma',
      url: 'https://www.figma.com/file/oY0oRyqDxQZMeMqG4BSwrf/30-seconds-web?node-id=193%3A0',
    },
    jest: [
      'anchor',
    ],
  },
};

export const component = () => {
  const children = text('children (string-only)', 'Click me!');
  const internal = boolean('link.internal', false);
  const url = text('link.url', '#');

  return (
    <Anchor
      link={ { url, internal } }
    >
      { children }
    </Anchor>
  );
};
