import React from 'react';
import { Button, CopyButton, AnchorButton } from 'atoms/button';
import { text, boolean } from '@storybook/addon-knobs';
import { withDesign } from 'storybook-addon-designs';
import regularButtonMdx from './regularButton/docs.mdx';
import copyButtonMdx from './copyButton/docs.mdx';
import anchorButtonMdx from './anchorButton/docs.mdx';

export default {
  title: 'Atoms|Button',
};

export const button = () => {
  const children = text('children (string-only)', 'Click me!');
  const className = text('className', '');
  return (
    <Button className={ className }>{ children }</Button>
  );
};
button.story = {
  component: Button,
  decorators: [
    withDesign,
  ],
  parameters: {
    docs: {
      page: regularButtonMdx,
    },
    design: {
      name: 'button',
      type: 'figma',
      url: 'https://www.figma.com/file/oY0oRyqDxQZMeMqG4BSwrf/30-seconds-web?node-id=271%3A0',
    },
    jest: [
      'button',
    ],
  },
};

export const copyButton = () => {
  const textData = text('text', 'Lorem Ipsum dolor sit amet.');
  return (
    <CopyButton text={ textData } />
  );
};
copyButton.story = {
  component: CopyButton,
  decorators: [
    withDesign,
  ],
  parameters: {
    docs: {
      page: copyButtonMdx,
    },
    design: {
      name: 'copyButton',
      type: 'figma',
      url: 'https://www.figma.com/file/oY0oRyqDxQZMeMqG4BSwrf/30-seconds-web?node-id=253%3A0',
    },
    jest: [
      'copyButton',
    ],
  },
};

export const anchorButton = () => {
  const children = text('children (string-only)', 'Click me!');
  const className = text('className', '');
  const internal = boolean('link.internal', false);
  const url = text('link.url', '#');
  return (
    <AnchorButton
      className={ className }
      link={ { url, internal } }
    >
      { children }
    </AnchorButton>
  );
};
anchorButton.story = {
  component: AnchorButton,
  parameters: {
    docs: {
      page: anchorButtonMdx,
    },
    jest: [
      'anchorButton',
    ],
  },
};
