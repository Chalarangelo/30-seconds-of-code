import React from 'react';
import Toast from 'atoms/toast';
import { text } from '@storybook/addon-knobs';
import { withDesign } from 'storybook-addon-designs';
import mdx from './docs.mdx';

export default {
  title: 'Atoms|Toast',
  component: Toast,
  decorators: [
    withDesign,
  ],
  parameters: {
    docs: {
      page: mdx,
    },
    design: {
      name: 'toast',
      type: 'figma',
      url: 'https://www.figma.com/file/oY0oRyqDxQZMeMqG4BSwrf/30-seconds-web?node-id=237%3A36',
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
