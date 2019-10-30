import React from 'react';
import SnippetPreview from 'atoms/snippetPreview';
import { text } from '@storybook/addon-knobs';
import mdx from './docs.mdx';

export default {
  title: 'Atoms|SnippetPreview',
  component: SnippetPreview,
  parameters: {
    docs: {
      page: mdx,
    },
    jest: [
      'snippetPreview',
    ],
  },
};

export const component = () => {
  const scopeId = 'my-special-snippet';
  const scopedCss =
    `[data-scope="my-special-snippet"] .my-special-snippet {
      background: red;
      color: white;
    }`;
  const jsCode = '';
  const htmlCode = '<p class="my-special-snippet">Hello, this is white on red.</p>';

  return (
    <SnippetPreview
      scopeId={ scopeId }
      scopedCss={ scopedCss }
      htmlCode={ htmlCode }
      jsCode={ jsCode }
    />
  );
};
