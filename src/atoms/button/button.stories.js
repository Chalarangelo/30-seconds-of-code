import React from 'react';
import {
  Button,
  CopyButton,
  AnchorButton,
  CodepenButton
} from 'atoms/button';
import { text, boolean } from '@storybook/addon-knobs';
import regularButtonMdx from './regularButton/docs.mdx';
import copyButtonMdx from './copyButton/docs.mdx';
import anchorButtonMdx from './anchorButton/docs.mdx';
import codepenButtonMdx from './codepenButton/docs.mdx';

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
  parameters: {
    docs: {
      page: regularButtonMdx,
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
  parameters: {
    docs: {
      page: copyButtonMdx,
    },
    jest: [
      'copyButton',
    ],
  },
};

export const codepenButton = () => {
  return (
    <CodepenButton
      htmlCode='<p class="my-special-snippet">Hello, this is white on red.</p>'
      cssCode={ `.my-special-snippet {
      background: red;
      color: white;
    }` } />
  );
};
codepenButton.story = {
  component: CodepenButton,
  parameters: {
    docs: {
      page: codepenButtonMdx,
    },
    jest: [
      'codepenButton',
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
