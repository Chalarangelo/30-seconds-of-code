import React from 'react';
import PropTypes from 'prop-types';
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
  rest: PropTypes.any,
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
  ...rest
}) => (
  <Card
    className={ className }
    { ...rest }
  >
    <h4 className='card-title'>
      { title }
    </h4>
    {
      dangerouslySetInnerHTML ? (
        <div
          className='card-description'
          dangerouslySetInnerHTML={ dangerouslySetInnerHTML } />
      ) : (
        <div className='card-description'>
          { children }
        </div>
      )
    }
  </Card>
);

SimpleCard.propTypes = propTypes;

export default SimpleCard;
