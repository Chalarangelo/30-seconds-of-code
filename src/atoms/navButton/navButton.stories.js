import React from 'react';
import NavButton, { NAV_ICONS } from 'atoms/navButton';
import { text, radios, boolean } from '@storybook/addon-knobs';
import { withDesign } from 'storybook-addon-designs';
import mdx from './docs.mdx';

export default {
  title: 'Atoms|NavButton',
  component: NavButton,
  decorators: [
    withDesign,
  ],
  parameters: {
    docs: {
      page: mdx,
    },
    design: {
      name: 'tag',
      type: 'figma',
      url: 'https://www.figma.com/file/oY0oRyqDxQZMeMqG4BSwrf/30-seconds-web?node-id=302%3A51',
    },
    jest: [
      'tag',
    ],
  },
};

export const component = () => {
  const className = text('className', '');
  const icon = radios('level', NAV_ICONS, 'search');
  const internal = boolean('link.internal', false);
  const url = text('link.url', '#');

  return (
    <NavButton
      icon={ icon }
      className={ className }
      link={ { url, internal } }
    />
  );
};
