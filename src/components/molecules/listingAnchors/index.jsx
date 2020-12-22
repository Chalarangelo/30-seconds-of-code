import React from 'react';
import PropTypes from 'typedefs/proptypes';
import { combineClassNames } from 'utils/index';

const propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  isCompact: PropTypes.bool,
  rest: PropTypes.any,
};

/**
 * Renders the set of buttons that link to other listing pages.
 * Used in Listing pages and Home page.
 */
const ListingAnchors = ({ items, isCompact = false, ...rest }) => {
  // Scroll the selected tag into view, so that users always know where they are
  React.useEffect(() => {
    if (isCompact && typeof document !== 'undefined') {
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

  return isCompact ? (
    <ul className='listing-anchors compact' {...rest}>
      {items.map(item => (
        <li key={item.url}>
          <a
            className={combineClassNames`btn ${
              item.selected ? 'selected' : undefined
            }`}
            href={item.url}
          >
            {item.name}
          </a>
        </li>
      ))}
    </ul>
  ) : (
    <ul className='listing-anchors' {...rest}>
      {items.map(item => (
        <li key={item.url}>
          <a
            className={combineClassNames`btn listing-anchor icon ${`icon-${item.icon}`}`}
            href={item.url}
            title={item.name}
          />
        </li>
      ))}
    </ul>
  );
};

ListingAnchors.propTypes = propTypes;

export default ListingAnchors;
