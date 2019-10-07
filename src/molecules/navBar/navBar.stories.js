import React from 'react';
import NavBar from 'molecules/navBar';
import { text, radios, boolean } from '@storybook/addon-knobs';
import { withDesign } from 'storybook-addon-designs';
import mdx from './docs.mdx';

export default {
  title: 'Molecules|NavBar',
  component: NavBar,
  decorators: [
    withDesign,
  ],
  parameters: {
    docs: {
      page: mdx,
    },
    design: {
      name: 'navBar',
      type: 'figma',
      url: 'https://www.figma.com/file/oY0oRyqDxQZMeMqG4BSwrf/30-seconds-web?node-id=302%3A51',
    },
    jest: [
      'navBar',
    ],
  },
};

export const component = () => {
  const buttons = [
    {
      icon: 'search',
      link: {
        internal: true,
        url: '/search',
        title: 'Search',
      },
    },
    {
      icon: 'list',
      link: {
        internal: true,
        url: '/list',
        title: 'Snippet list',
      },
    },
    {
      icon: 'github',
      link: {
        internal: false,
        url: 'https://github.com/',
        title: 'Snippet list',
        rel: 'noopener',
        target: '_blank',
      },
    },
    {
      icon: 'moon',
      link: {
        internal: false,
        url: '#',
        title: 'Switch to dark mode',
      },
      onClick: e => { e.preventDefault();alert('Switch mode'); },
    },
  ];

  return (
    <NavBar buttons={ buttons }/>
  );
};
