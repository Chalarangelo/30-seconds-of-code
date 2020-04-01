import React from 'react';
import PropTypes from 'prop-types';
import { Link as LinkPropType } from 'typedefs';
import { AnchorButton } from 'components/atoms/button';
import { trimWhiteSpace } from 'functions/utils';

const propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    link: LinkPropType.isRequired,
    name: PropTypes.string,
  })).isRequired,
  isCompact: PropTypes.bool,
  rest: PropTypes.any,
};

/**
 * Renders the set of buttons that link to other listing pages.
 * Used in Listing pages and Home page.
 * Dependent on `Button` and `PageSubtitle` components.
 */
const ListingAnchors = ({
  items,
  isCompact = false,
  ...rest
}) => {
  // Scroll the selected tag into view, so that users always know where they are
  React.useEffect(() => {
    if(isCompact && typeof document !== 'undefined') {
      // Wrap in try-catch to be able to test in Jest/Enzyme
      try {
        document
          .querySelector('.listing-anchors .selected')
          .scrollIntoView(false);
      } catch {
        return;
      }
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

ListingAnchors.propTypes = propTypes;

export default ListingAnchors;
