import React from 'react';
import PropTypes from 'typedefs/proptypes';
import { combineClassNames } from 'utils';
import { Button } from 'components/atoms/button';
import literals from 'lang/en/client/paginator';

const propTypes = {
  className: PropTypes.string,
  paginator: PropTypes.paginator,
};

/**
 * Renders a pagination component.
 * Dependent on the `Button` component.
 * @param {object} paginator - Pagination data fo the component.
 */
const Paginator = ({
  className,
  paginator: { pageNumber, totalPages, baseUrl, slugOrderingSegment },
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
  else if (pageNumber <= 2) buttons = [1, 2, '...', totalPages];
  else if (totalPages - pageNumber <= 1)
    buttons = [1, '...', totalPages - 1, totalPages];
  else buttons = [1, '...', pageNumber, '...', totalPages];

  return (
    <div className={combineClassNames`paginator flex j-center ${className}`}>
      {pageNumber > 1 && (
        <a
          className='btn previous-page fs-md icon icon-chevron-left'
          href={`${baseUrl}/${slugOrderingSegment}/${pageNumber - 1}`}
          rel='prev'
        >
          {literals.previous}
        </a>
      )}
      {buttons.map((buttonNumber, i) =>
        buttonNumber === '...' ? (
          <span className='paginator-separator txt-050 fs-xl' key={`sep-${i}`}>
            {buttonNumber}
          </span>
        ) : buttonNumber === pageNumber ? (
          <Button className='current-page fs-xl' key={buttonNumber}>
            {buttonNumber}
          </Button>
        ) : (
          <a
            key={buttonNumber}
            className='btn fs-md'
            href={`${baseUrl}/${slugOrderingSegment}/${buttonNumber}`}
          >
            {buttonNumber}
          </a>
        )
      )}
      {pageNumber < totalPages && (
        <a
          className='btn next-page fs-md icon icon-chevron-right'
          href={`${baseUrl}/${slugOrderingSegment}/${pageNumber + 1}`}
          rel='next'
        >
          {literals.next}
        </a>
      )}
    </div>
  );
};

Paginator.propTypes = propTypes;

export default Paginator;
