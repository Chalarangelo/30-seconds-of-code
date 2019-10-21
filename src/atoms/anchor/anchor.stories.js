import React from 'react';
import { Anchor, LinkBackAnchor} from 'atoms/anchor';
import { text, boolean } from '@storybook/addon-knobs';
import regularAnchorMdx from './regularAnchor/docs.mdx';
import linkBackAnchorMdx from './linkBackAnchor/docs.mdx';

export default {
  title: 'Atoms|Anchor',
};

export const anchor = () => {
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
anchor.story = {
  component: Anchor,
  parameters: {
    docs: {
      page: regularAnchorMdx,
    },
    jest: [
      'anchor',
    ],
  },
};

export const linkBackAnchor = () => {
  const children = text('children (string-only)', 'Back to Home');
  const internal = boolean('link.internal', false);
  const url = text('link.url', '#');

  return (
    <LinkBackAnchor
      link={ { url, internal } }
    >
      { children }
    </LinkBackAnchor>
  );
};

linkBackAnchor.story = {
  component: LinkBackAnchor,
  parameters: {
    docs: {
      page: linkBackAnchorMdx,
    },
    jest: [
      'linkBackAnchor',
    ],
  },
};
