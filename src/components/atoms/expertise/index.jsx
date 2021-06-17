import PropTypes from 'typedefs/proptypes';

const propTypes = {
  level: PropTypes.string,
};

/**
 * Renders an expertise tag.
 * @param {string} level - One of the appropriate expertise levels:
 *   "beginner", "intermediate" (default), "advanced", "article"
 */
const Expertise = ({ level = 'intermediate' }) => (
  <span className={`expertise br-round ${level}`} />
);

Expertise.propTypes = propTypes;

export default Expertise;
