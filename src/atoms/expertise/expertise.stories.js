import React from 'react';
import Expertise, { EXPERTISE_LEVELS } from 'atoms/expertise';
import { radios } from '@storybook/addon-knobs';
import { withDesign } from 'storybook-addon-designs';
import mdx from './docs.mdx';

export default {
  title: 'Atoms|Expertise',
  component: Expertise,
  decorators: [
    withDesign,
  ],
  parameters: {
    docs: {
      page: mdx,
    },
    design: {
      name: 'expertise',
      type: 'figma',
      url: 'https://www.figma.com/file/oY0oRyqDxQZMeMqG4BSwrf/30-seconds-web?node-id=80%3A10',
    },
    jest: [
      'expertise',
    ],
  },
};

export const component = () => {
  const level = radios('level', EXPERTISE_LEVELS, 'intermediate');

  return (
    <Expertise level={ level } />
  );
};
