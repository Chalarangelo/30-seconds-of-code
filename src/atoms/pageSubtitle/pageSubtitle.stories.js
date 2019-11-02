import React from 'react';
import PageSubtitle from 'atoms/pageSubtitle';
import { text, boolean } from '@storybook/addon-knobs';
import mdx from './docs.mdx';

export default {
  title: 'Atoms|PageSubtitle',
  component: PageSubtitle,
  parameters: {
    docs: {
      page: mdx,
    },
    jest: [
      'pageSubtitle',
    ],
  },
};

export const component = () => {
  const subtitle = text('subtitle', 'Page subtitle');
  const isLight = boolean('isLight', false);

  return (
    <PageSubtitle isLight={ isLight }>
      { subtitle }
    </PageSubtitle>
  );
};
