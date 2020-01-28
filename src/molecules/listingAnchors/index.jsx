import React from 'react';
import PropTypes from 'prop-types';
import { Link as LinkPropType } from 'typedefs';
import { AnchorButton } from 'atoms/button';
import { trimWhiteSpace } from 'functions/utils';

/**
 * Renders the set of buttons that link to other listing pages.
 * Used in Listing pages and Home page.
 * Depends on Button and PageSubtitle atoms.
 */
const ListingAnchors = ({
  items,
  isCompact = false,
  ...rest
}) => {
  // Scroll the selected tag into view, so that users always know where they are
  React.useEffect(() => {
    if(isCompact) {
      document
        .querySelector('.listing-anchors .selected')
        .scrollIntoView(false);
    }
  }, []);

  return isCompact ?
    <ul
      className='listing-anchors compact'
      { ...rest }
    >
      { items.map(item =>
        <li key={ item.link.url }>
          <AnchorButton
            link={ item.link }
            className={ trimWhiteSpace`${item.selected ? 'selected' : ''}` }
          >
            { item.name }
          </AnchorButton>
        </li>
      ) }
    </ul>
    :
    <ul className='listing-anchors'
      { ...rest }
    >
      { items.map(item =>
        <li key={ item.link.url }>
          <AnchorButton
            className={ `listing-anchor icon ${`icon-${item.icon}`}` }
            style={ item.style }
            link={ item.link }
            title={ item.name }
          />
        </li>
      ) }
    </ul>;
};

ListingAnchors.propTypes = {
  /** Items that compose the listing anchors */
  items: PropTypes.arrayOf(PropTypes.shape({
    link: LinkPropType.isRequired,
    name: PropTypes.string,
  })).isRequired,
  /** Compact or large listing anchors */
  isCompact: PropTypes.bool,
  /** Any other props to be passed to the component */
  rest: PropTypes.any,
};

export default ListingAnchors;
