import React from 'react';
import Footer from 'molecules/footer';
import mdx from './docs.mdx';

export default {
  title: 'Molecules|Footer',
  component: Footer,
  parameters: {
    docs: {
      page: mdx,
    },
    jest: [
      'footer',
    ],
  },
};

export const component = () => {
  return (
    <Footer />
  );
};
