import React from 'react';
import Expertise, { EXPERTISE_LEVELS } from 'atoms/expertise';
import { radio } from '@storybook/addon-knobs';
import { withDesign } from 'storybook-addon-designs';

export default {
  title: 'Atoms|Expertise',
  component: Expertise,
  decorators: [
    withDesign,
  ],
  parameters: {
    design: {
      name: 'beginner',
      type: 'figma',
      url: 'https://www.figma.com/file/oY0oRyqDxQZMeMqG4BSwrf/30-seconds-web?node-id=80%3A10',
    },
  },
};

export const component = () => {
  const level = radio('level', EXPERTISE_LEVELS, 'intermediate');

  return (
    <Expertise level={ level } />
  );
};
