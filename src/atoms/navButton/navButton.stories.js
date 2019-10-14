import React from 'react';
import NavButton, { NAV_ICONS } from 'atoms/navButton';
import { text, radios, boolean } from '@storybook/addon-knobs';
import mdx from './docs.mdx';

export default {
  title: 'Atoms|NavButton',
  component: NavButton,
  parameters: {
    docs: {
      page: mdx,
    },
    jest: [
      'navButton',
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
