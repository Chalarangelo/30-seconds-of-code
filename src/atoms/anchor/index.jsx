import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import { Link as LinkPropType } from 'proptypes';

const Anchor = ({
  children,
  link,
  ...rest
}) => {
  return link.internal ?
    (
      <Link
        to={ link.url }
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
};

Anchor.propTypes = {
  /** Children elements */
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  /** Anchor link data */
  link: LinkPropType.isRequired,
  /** Any other props to be passed to the component */
  rest: PropTypes.any,
};

export default Anchor;
