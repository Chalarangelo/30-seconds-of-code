import React from 'react';
import NavBar from 'molecules/navBar';
import mdx from './docs.mdx';

export default {
  title: 'Molecules|NavBar',
  component: NavBar,
  parameters: {
    docs: {
      page: mdx,
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
