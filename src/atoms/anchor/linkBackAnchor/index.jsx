import React from 'react';
import { Anchor } from 'atoms/anchor';
import PropTypes from 'prop-types';
import { Link as LinkPropType } from 'typedefs';
import { trimWhiteSpace } from 'functions/utils';

const LinkBackAnchor = ({
  children,
  link,
  className,
  ...rest
}) =>
  (
    <Anchor
      className={ trimWhiteSpace`link-back ${className}` }
      link={ link }
      { ...rest }
    >
      { children }
    </Anchor>
  );

LinkBackAnchor.propTypes = {
  /** Children elements */
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  /** Anchor link data */
  link: LinkPropType.isRequired,
  /** Additional class names for the anchor */
  className: PropTypes.string,
  /** Any other props to be passed to the component */
  rest: PropTypes.any,
};

export default LinkBackAnchor;
