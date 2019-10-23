import React from 'react';
import PropTypes from 'prop-types';
import { trimWhiteSpace } from 'functions/utils';
import { EXPERTISE_LEVELS } from 'shared';
import _ from 'lang';
const _l = _('en');

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
