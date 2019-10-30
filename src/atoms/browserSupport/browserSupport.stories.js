import React from 'react';
import BrowserSupport from 'atoms/browserSupport';
import { number } from '@storybook/addon-knobs';
import mdx from './docs.mdx';

export default {
  title: 'Atoms|BrowserSupport',
  component: BrowserSupport,
  parameters: {
    docs: {
      page: mdx,
    },
    jest: [
      'browserSupport',
    ],
  },
};

export const component = () => {
  const supportPercentage = number('supportPercentage', 96.51);
  const browserSupportHtml = '<ul><li><a href="https://caniuse.com/#feat=css-animation">https://caniuse.com/#feat=css-animation</a></li></ul>';

  return (
    <BrowserSupport
      supportPercentage={ supportPercentage }
      browserSupportHtml={ browserSupportHtml }
    />
  );
};
