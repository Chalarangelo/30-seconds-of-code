import React from 'react';
import CTA from 'molecules/cta';
import mdx from './docs.mdx';

export default {
  title: 'Organisms|CTA',
  component: CTA,
  parameters: {
    docs: {
      page: mdx,
    },
    jest: [
      'cta',
    ],
  },
};

export const component = () => {
  const snippetUrl = 'https://google.com';
  const acceptsCookies = false;

  return (
    <CTA
      snippetUrl={ snippetUrl }
      acceptsCookies={ acceptsCookies }
    />
  );
};
