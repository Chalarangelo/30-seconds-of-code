import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import { Link as LinkPropType } from 'typedefs';
import { addTrailingSlashToSlug } from 'functions/utils';

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  link: LinkPropType.isRequired,
  rest: PropTypes.any,
};

/**
 * Anchor component, used to link to a different URL (internal or external).
 * Dependent on Gatsby's `Link` component for implementing internal links.
 */
const Anchor = ({
  children,
  link,
  ...rest
}) => link.internal ? (
  <Link
    to={ addTrailingSlashToSlug(link.url) }
    rel={ link.rel }
    target={ link.target }
    { ...rest }
  >
    { children }
  </Link>
) : (
  <a
    href={ link.url }
    rel={ link.rel }
    target={ link.target }
    { ...rest }
  >
    { children }
  </a>
);

Anchor.propTypes = propTypes;

export default Anchor;
