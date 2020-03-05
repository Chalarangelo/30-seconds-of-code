import React from 'react';
import PropTypes from 'prop-types';
import { trimWhiteSpace } from 'functions/utils';
import { AnchorButton, Button } from 'atoms/button';
import { Paginator as PaginatorPropType } from 'typedefs';

/**
 * Renders a pagination component (responsively).
 * Depends on Button atom.
 * Utilizes the media hook.
 */
const Paginator = ({
  className,
  paginator: {
    pageNumber,
    totalPages,
    baseUrl,
    slugOrderingSegment,
  },
}) => {
  if (totalPages <= 1) return null;

  /*
    Up to 3 buttons (apart from next and previous):
    - page 1: 1,2,...{totalPages}
    - page 2: 1,2....{totalPages}
    - page 3: 1...3....{totalPages}
    - page X: 1,... X...{totalPages}
    - page {totalPages-2}: 1,...{totalPages-2}...{totalPages}
    - page {totalPages-1}: 1,...{totalPages-1},{totalPages}
    - page {totalPages}: 1,...{totalPages-1},{totalPages}
    - totalPages < 3: all
  */
  let buttons = [];
  if (totalPages <= 3)
    buttons = Array.from({ length: totalPages }, (v, i) => i + 1);
  else if (pageNumber <= 2)
    buttons = [1, 2, '...', totalPages];
  else if (totalPages - pageNumber <= 2)
    buttons = [1, '...', totalPages - 1, totalPages];
  else
    buttons = [1, '...', pageNumber, '...', totalPages];

  return (
    <div
      className={ trimWhiteSpace`paginator ${className}` }
    >
      { pageNumber > 1 &&
      <AnchorButton
        className='previous-page icon icon-chevron-left'
        link={ {
          internal: true,
          url: `${baseUrl}/${slugOrderingSegment}/${pageNumber - 1}`,
        } }>
        { '\u200b' }
      </AnchorButton> }
      {
        buttons.map((buttonNumber, i) => (
          buttonNumber === '...' ?
            <span
              className='paginator-separator'
              key={ `sep-${i}` }
            >
              { buttonNumber }
            </span> :
            buttonNumber === pageNumber ?
              <Button
                className='current-page'
                key={ buttonNumber }
              >
                { buttonNumber }
              </Button> :
              <AnchorButton
                key={ buttonNumber }
                link={ {
                  internal: true,
                  url: `${baseUrl}/${slugOrderingSegment}/${buttonNumber}`,
                } }
              >
                { buttonNumber }
              </AnchorButton>
        ))
      }
      { pageNumber < totalPages &&
      <AnchorButton
        className='next-page icon icon-chevron-right'
        link={ {
          internal: true,
          url: `${baseUrl}/${slugOrderingSegment}/${pageNumber + 1}`,
        } }>
        { '\u200b' }
      </AnchorButton> }
    </div>
  );
};

Paginator.propTypes = {
  /** Additional classes for the paginator */
  className: PropTypes.string,
  /** Paginator component data */
  paginator: PaginatorPropType,
};

export default Paginator;
