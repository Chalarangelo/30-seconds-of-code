import PropTypes from 'typedefs/proptypes';

const iconPropTypes = {
  icon: PropTypes.string.isRequired,
  expertise: PropTypes.string,
  displayExpertise: PropTypes.bool,
};

export const CardIcon = ({
  icon,
  expertise = 'intermediate',
  displayExpertise = true,
}) => (
  <div
    className={`card-icon relative inline-block ${
      displayExpertise ? 'br-round' : 'br-xl'
    } icon icon-${icon} before:fs-lg`}
  >
    {displayExpertise && (
      <span className={`expertise box-border br-round ${expertise}`} />
    )}
  </div>
);

CardIcon.propTypes = iconPropTypes;

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
