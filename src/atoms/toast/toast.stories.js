import React from 'react';
import Toast from 'atoms/toast';
import { text } from '@storybook/addon-knobs';
import mdx from './docs.mdx';

export default {
  title: 'Atoms|Toast',
  component: Toast,
  parameters: {
    docs: {
      page: mdx,
    },
    jest: [
      'toast',
    ],
  },
};

export const component = () => {
  const message = text('message', 'Snippet copied to clipboard!');

  return (
    <Toast message={ message } />
  );
};
