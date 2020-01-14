import React from 'react';
import PropTypes from 'prop-types';
import { capitalize } from 'functions/utils';

const Tag = ({
  name,
}) =>
  name ?
    (
      <span className="tag">
        { capitalize(name) }
      </span>
    )
    : null
;

Tag.propTypes = {
  /** Tag string literal */
  name: PropTypes.string,
};

export default Tag;
