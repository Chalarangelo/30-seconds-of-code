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
  rest: PropTypes.any,
};

/**
 * Renders the set of buttons that link to other listing pages.
 * Used in Listing pages and Home page.
 */
const ListingAnchors = ({ items = false, ...rest }) => {
  // Scroll the selected tag into view, so that users always know where they are
  React.useEffect(() => {
    if (typeof document !== 'undefined') {
      // Wrap in try-catch to be able to test in Jest/Enzyme
      try {
        const listItem = document.querySelector('.listing-anchors .selected')
          .parentNode;
        const container = listItem.offsetParent;
        if (
          container.scrollLeft + container.clientWidth <
          listItem.offsetLeft + listItem.offsetWidth
        )
          container.scrollTo(listItem.offsetLeft + listItem.offsetWidth, 0);
      } catch {
        return;
      }
    }
  }, []);

  return (
    <ul className='list-section listing-anchors flex' {...rest}>
      {items.map(item => (
        <li key={item.url}>
          <a
            className={combineClassNames`btn no-shd link-btn ${
              item.selected ? 'selected' : undefined
            }`}
            href={item.url}
          >
            {item.name}
          </a>
        </li>
      ))}
    </ul>
  );
};

ListingAnchors.propTypes = propTypes;

export default ListingAnchors;
