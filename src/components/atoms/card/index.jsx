import PropTypes from 'typedefs/proptypes';

const propTypes = {
  className: PropTypes.string,
  rest: PropTypes.any,
};

/**
 * Generic card component. Renders a simple `<div>` element with a base class
 * and passes everything else to the element.
 */
const Card = ({ className = '', ...rest }) => (
  <div className={`card srfc-02dp txt-100 ${className}`} {...rest} />
);

Card.propTypes = propTypes;

export default Card;
