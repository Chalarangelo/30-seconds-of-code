import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import StandardSnippetCard from './standardSnippetCard';
import CssSnippetCard from './cssSnippetCard';
import BlogSnippetCard from './blogSnippetCard';

export {
  StandardSnippetCard,
  CssSnippetCard,
  BlogSnippetCard,
};

/**
 * Renders a snippet card.
 * Used in snippet pages.
 */
const SnippetCard = ({
  cardTemplate,
  hasGithubLinksEnabled,
  ...rest
}) => {
  switch (cardTemplate) {
  case 'blog':
    return (
      <BlogSnippetCard
        hasGithubLinksEnabled={ !!hasGithubLinksEnabled }
        { ...rest }
      />
    );
  case 'css':
    return (
      <CssSnippetCard
        hasGithubLinksEnabled={ !!hasGithubLinksEnabled }
        { ...rest }
      />
    );
  case 'standard':
  default:
    return (
      <StandardSnippetCard
        hasGithubLinksEnabled={ !!hasGithubLinksEnabled }
        { ...rest }
      />
    );
  }
};

SnippetCard.displayName = 'SnippetCardWrapper';

SnippetCard.propTypes = {
  /** Card template name */
  cardTemplate: PropTypes.string,
  /** Are GitHub links enabled? */
  hasGithubLinksEnabled: PropTypes.bool,
  /** Any other arguments to be passed to the card */
  rest: PropTypes.any,
};

export default connect(
  state => ({
    hasGithubLinksEnabled: state.shell.hasGithubLinksEnabled,
  }),
  null
)(SnippetCard);
