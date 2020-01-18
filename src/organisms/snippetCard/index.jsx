import React from 'react';
import PropTypes from 'prop-types';

import StandardSnippetCard from './standardSnippetCard';
import CssSnippetCard from './cssSnippetCard';
import BlogSnippetCard from './blogSnippetCard';

export {
  StandardSnippetCard,
  CssSnippetCard,
  BlogSnippetCard,
};

const SnippetCard = ({
  cardTemplate,
  ...rest
}) => {
  switch (cardTemplate) {
  case 'blog':
    return (
      <BlogSnippetCard
        { ...rest }
      />
    );
  case 'css':
    return (
      <CssSnippetCard
        { ...rest }
      />
    );
  case 'standard':
  default:
    return (
      <StandardSnippetCard
        { ...rest }
      />
    );
  }
};

SnippetCard.displayName = 'SnippetCardWrapper';

SnippetCard.propTypes = {
  /** Card template name */
  cardTemplate: PropTypes.string,
  /** Any other arguments to be passed to the card */
  rest: PropTypes.any,
};

export default SnippetCard;
