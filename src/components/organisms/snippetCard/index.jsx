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

const propTypes = {
  cardTemplate: PropTypes.string,
  hasGithubLinksEnabled: PropTypes.bool,
  dispatch: PropTypes.func,
  rest: PropTypes.any,
};

/**
 * Renders a snippet card. (Redux-connected)
 * Used in snippet pages.
 * Dependent on its internal components to implement the desired functionality.
 */
const SnippetCard = ({
  cardTemplate,
  hasGithubLinksEnabled,
  // Keep dispatch here, as to not pass it down the component tree and get errors.
  // eslint-disable-next-line no-unused-vars
  dispatch,
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

SnippetCard.propTypes = propTypes;

export default connect(
  state => ({
    hasGithubLinksEnabled: state.shell.hasGithubLinksEnabled,
  }),
  null
)(SnippetCard);
