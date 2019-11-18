import React from 'react';
import RecommendationList from 'molecules/recommendationList';
import mdx from './docs.mdx';

export default {
  title: 'Organisms|RecommendationList',
  component: RecommendationList,
  parameters: {
    docs: {
      page: mdx,
    },
    jest: [
      'recommendationList',
    ],
  },
};

export const component = () => {
  return (
    <p>This story is a stub.</p>
  );
};
