import React from 'react';
import PropTypes from 'typedefs/proptypes';
import { Link } from 'gatsby';
import { addTrailingSlashToSlug } from 'utils';

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  link: PropTypes.link.isRequired,
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
