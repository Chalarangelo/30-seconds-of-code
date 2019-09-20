import React from 'react';
import Expertise from 'atoms/expertise';
import { select, withKnobs } from '@storybook/addon-knobs';
import { withDesign } from 'storybook-addon-designs';

export default {
  title: 'Atoms|Expertise',
  component: Expertise,
  decorators: [
    withKnobs,
    withDesign
  ],
  parameters: {
    design: {
      name: 'beginner',
      type: 'figma',
      url: 'https://www.figma.com/file/oY0oRyqDxQZMeMqG4BSwrf/30-seconds-web?node-id=80%3A10'
    }
  }
}

export const component = () => {
  const level = select('level', ['beginner', 'intermediate', 'advanced'], 'intermediate');

  return (
    <Expertise level={level} />
  )
};