import PropTypes from 'typedefs/proptypes';
import Link from 'next/link';
import { Button } from 'components/atoms/button';
import literals from 'lang/en/client/paginator';

const propTypes = {
  paginator: PropTypes.paginator,
};

/**
 * Renders a pagination component.
 * Dependent on the `Button` component.
 * @param {object} paginator - Pagination data fo the component.
 */
const Paginator = ({
  paginator: { pageNumber, totalPages, baseUrl, slugOrderingSegment },
}) => {
  if (totalPages <= 1) return null;

  /*
    Up to 3 buttons (apart from next and previous):
    - page 1: 1·2·{totalPages}
    - page X: 1·X·{totalPages}
    - page {totalPages}: 1·{totalPages-1}·{totalPages}
    - totalPages <= 3: all
  */
  let buttons = [];
  if (totalPages <= 3)
    buttons = Array.from({ length: totalPages }, (v, i) => i + 1);
  else if (pageNumber === 1) buttons = [1, '·', 2, '·', totalPages];
  else if (totalPages - pageNumber === 0)
    buttons = [1, '·', totalPages - 1, '·', totalPages];
  else buttons = [1, '·', pageNumber, '·', totalPages];

  return (
    <div className='paginator flex j-center'>
      {pageNumber > 1 && (
        <Link href={`${baseUrl}/${slugOrderingSegment}/${pageNumber - 1}`}>
          <a
            className='btn no-shd link-btn previous-page fs-no md:fs-sm icon icon-chevron-left'
            rel='prev'
          >
            {literals.previous}
          </a>
        </Link>
      )}
      {buttons.map((buttonNumber, i) =>
        buttonNumber === '·' ? (
          <span className='paginator-separator txt-050 fs-xl' key={`sep-${i}`}>
            {buttonNumber}
          </span>
        ) : buttonNumber === pageNumber ? (
          <Button className='no-shd current-page fs-xl' key={buttonNumber}>
            {buttonNumber}
          </Button>
        ) : (
          <Link
            key={buttonNumber}
            href={`${baseUrl}/${slugOrderingSegment}/${buttonNumber}`}
          >
            <a className='btn no-shd link-btn fs-md'>{buttonNumber}</a>
          </Link>
        )
      )}
      {pageNumber < totalPages && (
        <Link href={`${baseUrl}/${slugOrderingSegment}/${pageNumber + 1}`}>
          <a
            className='btn no-shd link-btn next-page fs-no md:fs-sm icon icon-chevron-right'
            rel='next'
          >
            {literals.next}
          </a>
        </Link>
      )}
    </div>
  );
};

Paginator.propTypes = propTypes;

export default Paginator;
