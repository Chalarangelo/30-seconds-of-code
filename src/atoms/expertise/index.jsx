import React from 'react';
import PropTypes from 'prop-types';
import { trimWhiteSpace } from 'functions/utils';
import { EXPERTISE_LEVELS } from 'shared';
import _ from 'lang';
const _l = _('en');

/**
 * Renders an expertise tag.
 */
const Expertise = ({
  level = 'Intermediate',
}) => level ? (
  <span className={ trimWhiteSpace`expertise ${level.toLowerCase()}` } />
) : null;

Expertise.propTypes = {
  /** Snippet expertise rating */
  level: PropTypes.oneOf(EXPERTISE_LEVELS),
};

export default Expertise;
