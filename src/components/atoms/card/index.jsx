import { memo } from 'react';

// Icon
export const CardIcon = memo(({ icon, expertise }) => (
  <div
    className={`card-icon relative inline-block ${
      expertise ? 'br-round' : 'br-xl'
    } icon icon-${icon} before:fs-lg mt-1`}
  />
));

CardIcon.displayName = 'CardIcon';

// Title
export const CardTitle = memo(({ isSecondary = false, children, ...rest }) => {
  const H = isSecondary ? 'h3' : 'h1';

  return (
    <H
      className='card-title m-0 txt-200 fs-lg md:fs-xl f-alt f-ellipsis'
      {...rest}
    >
      {children}
    </H>
  );
});

CardTitle.displayName = 'CardTitle';

// Subtitle
export const CardSubtitle = memo(({ children }) => (
  <p className='inline-block txt-050 fs-xs m-0'>{children}</p>
));

CardSubtitle.displayName = 'CardSubtitle';

export const cardClassName = 'card srfc-01dp txt-100 br-lg';

// Card
/**
 * Generic card component. Renders a simple `<div>` element with a base class
 * and passes everything else to the element.
 */
const Card = ({ className = '', ...rest }) => (
  <div className={`${cardClassName} ${className}`} {...rest} />
);

export default Card;
