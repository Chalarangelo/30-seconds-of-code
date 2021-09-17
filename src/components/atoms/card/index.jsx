import { memo } from 'react';
import PropTypes from 'typedefs/proptypes';

// Icon

const iconPropTypes = {
  icon: PropTypes.string.isRequired,
  expertise: PropTypes.string,
  displayExpertise: PropTypes.bool,
};

export const CardIcon = memo(
  ({ icon, expertise = 'intermediate', displayExpertise = true }) => (
    <div
      className={`card-icon relative inline-block ${
        displayExpertise ? 'br-round' : 'br-xl'
      } icon icon-${icon} before:fs-lg`}
    >
      {displayExpertise && (
        <span className={`expertise box-border br-round ${expertise}`} />
      )}
    </div>
  )
);

CardIcon.displayName = 'CardIcon';
CardIcon.propTypes = iconPropTypes;

// Title

const titlePropTypes = {
  isSecondary: PropTypes.bool,
  children: PropTypes.node,
};

export const CardTitle = memo(({ isSecondary = false, children }) => {
  const H = isSecondary ? 'h3' : 'h1';

  return (
    <H className='card-title txt-200 fs-xl f-alt f-ellipsis'>{children}</H>
  );
});

CardTitle.displayName = 'CardTitle';
CardTitle.propTypes = titlePropTypes;

// Subtitle

const subtitlePropTypes = {
  children: PropTypes.node,
};

export const CardSubtitle = memo(({ children }) => (
  <p className='card-subtitle txt-050 fs-xs m-0'>{children}</p>
));

CardSubtitle.displayName = 'CardSubtitle';
CardSubtitle.propTypes = subtitlePropTypes;

// Card

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
