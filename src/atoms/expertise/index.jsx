import React from 'react';
import PropTypes from 'prop-types';
import { trimWhiteSpace } from 'functions/utils';
import _ from 'lang';
const _l = _('en');

export const EXPERTISE_LEVELS = ['beginner', 'intermediate', 'advanced'];

const Expertise = ({
  level = 'intermediate',
}) => (
  <div className={ trimWhiteSpace`expertise ${level}` } title={ _l`Expertise${level}` }/>
);

Expertise.propTypes = {
  /** Snippet expertise rating */
  level: PropTypes.oneOf(EXPERTISE_LEVELS),
};

export default Expertise;
