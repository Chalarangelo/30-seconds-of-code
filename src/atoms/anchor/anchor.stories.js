import React from 'react';
import Anchor from 'atoms/anchor';
import { text, boolean } from '@storybook/addon-knobs';
import mdx from './docs.mdx';

export default {
  title: 'Atoms|Anchor',
  component: Anchor,
  parameters: {
    docs: {
      page: mdx,
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
