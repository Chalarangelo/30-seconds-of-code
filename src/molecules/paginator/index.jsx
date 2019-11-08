import React from 'react';
import PropTypes from 'prop-types';
import { trimWhiteSpace } from 'functions/utils';
import { AnchorButton, Button } from 'atoms/button';
import { Paginator as PaginatorPropType } from 'typedefs';
import { useMedia } from 'functions/hooks';
import _ from 'lang';
const _l = _('en');

const Paginator = ({
  className,
  paginator: {
    pageNumber,
    totalPages,
    baseUrl,
  },
}) => {
  if (totalPages <= 1) return null;

  const buttonTexts = useMedia(
    ['(max-width: 600px'],
    [['\u200b', '\u200b']],
    [_l('Previous'), _l('Next')]
  );

  const showAllButtons = useMedia(
    ['(max-width: 420px'],
    [false],
    true
  );

  /*
    Up to 5 buttons (apart from next and previous):
    - page 1: 1,2,3,4,...{totalPages}
    - page 2: 1,2,3,4....{totalPages}
    - page 3: 1...3,4,5....{totalPages}
    - page X: 1,... X-1,X,X+1,...{totalPages}
    - page {totalPages-2}: 1,...{totalPages-5},{totalPages-4},{totalPages-3}...{totalPages}
    - page {totalPages-1}: 1,...{totalPages-3},{totalPages-2},{totalPages-1},{totalPages}
    - page {totalPages}: 1,...{totalPages-3},{totalPages-2},{totalPages-1},{totalPages}
    - totalPages < 5: all
  */
  let buttons = [];
  if (showAllButtons) {
    if (totalPages <= 5)
      buttons = Array.from({ length: totalPages }, (v, i) => i + 1);
    else if (pageNumber <= 2)
      buttons = [1, 2, 3, 4, '...', totalPages];
    else if (totalPages - pageNumber <= 2)
      buttons = [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    else
      buttons = [1, '...', pageNumber - 1, pageNumber, pageNumber + 1, '...', totalPages];
  } else {
    if (totalPages <= 3)
      buttons = totalPages.map(v => v + 1);
    else if (pageNumber <= 2)
      buttons = [1, 2, totalPages];
    else if (totalPages - pageNumber <= 2)
      buttons = [1, totalPages - 1, totalPages];
    else
      buttons = [1, pageNumber, totalPages];
  }

  return (
    <div
      className={ trimWhiteSpace`paginator ${className}` }
    >
      { pageNumber > 1 &&
      <AnchorButton
        className='previous-page'
        link={ {
          internal: true,
          url: `${baseUrl}/p/${pageNumber - 1}`,
        } }>
        { buttonTexts[0] }
      </AnchorButton> }
      {
        buttons.map((buttonNumber, i) => (
          buttonNumber === '...' ?
            <span
              className='paginator-separator'
              key={ `sep-${i}` }
            >
              { _l('...') }
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
                  url: `${baseUrl}/p/${buttonNumber}`,
                } }
              >
                { buttonNumber }
              </AnchorButton>
        ))
      }
      { pageNumber < totalPages &&
      <AnchorButton
        className='next-page'
        link={ {
          internal: true,
          url: `${baseUrl}/p/${pageNumber + 1}`,
        } }>
        { buttonTexts[1] }
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
