import React from 'react';
import PropTypes from 'typedefs/proptypes';
import Card from 'components/atoms/card';

const propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  dangerouslySetInnerHTML: PropTypes.shape({
    __html: PropTypes.string,
  }),
};

/**
 * Renders a non-snippet card container.
 * Used in About and Cookie pages.
 * Dependent on `Card` component.
 * @param {*} children - Children for the card, will only render if  `dangerouslySetInnerHTML` is `undefined`.
 * @param {*} dangerouslySetInnerHTML - Inner html object for the card, will take precedence over `children` if both are present.
 */
const SimpleCard = ({
  className,
  title,
  children,
  dangerouslySetInnerHTML,
}) => (
  <Card className={className}>
    <h3 className='card-title simple-card-title txt-200 fs-xl f-alt'>
      {title}
    </h3>
    {dangerouslySetInnerHTML ? (
      <div
        className='card-description'
        dangerouslySetInnerHTML={dangerouslySetInnerHTML}
      />
    ) : (
      <div className='card-description'>{children}</div>
    )}
  </Card>
);

SimpleCard.propTypes = propTypes;

export default SimpleCard;
