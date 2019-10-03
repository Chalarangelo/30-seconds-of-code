import React from 'react';
import CopyButton from 'atoms/copyButton';
import { text } from '@storybook/addon-knobs';
import { withDesign } from 'storybook-addon-designs';
import mdx from './docs.mdx';

export default {
  title: 'Atoms|CopyButton',
  component: CopyButton,
  decorators: [
    withDesign,
  ],
  parameters: {
    docs: {
      page: mdx,
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

export const component = () => {
  const textData = text('text', 'Lorem Ipsum dolor sit amet.');
  return (
    <CopyButton text={ textData } />
  );
};
