import React from 'react';
import PageBackdrop from 'molecules/pageBackdrop';
import { text } from '@storybook/addon-knobs';
import mdx from './docs.mdx';

export default {
  title: 'Molecules|PageBackdrop',
  component: PageBackdrop,
  parameters: {
    docs: {
      page: mdx,
    },
    jest: [
      'pageBackdrop',
    ],
  },
};

export const component = () => {
  const graphicName = text('graphicName', 'search-empty');
  const mainText = text('mainText', 'Start typing a keyword to see some results.');
  const mainTextClassName = text('mainTextClassName', 'search-main');
  const subText = text('subText', 'Search for something...');
  const subTextClassName = text('subTextClassName', 'search-sub');

  return (
    <PageBackdrop
      graphicName={ graphicName }
      mainText={ mainText }
      mainTextClassName={ mainTextClassName }
      subText={ subText }
      subTextClassName={ subTextClassName }
    />
  );
};
