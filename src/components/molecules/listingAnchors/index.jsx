import { useEffect } from 'react';
import PropTypes from 'typedefs/proptypes';
import Link from 'next/link';

const propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

/**
 * Renders the set of buttons that link to other listing pages.
 * Used in Listing pages and Home page.
 */
const ListingAnchors = ({ items = [] }) => {
  // Scroll the selected tag into view, so that users always know where they are
  useEffect(() => {
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
    <ul className='list-section listing-anchors flex'>
      {items.map(item => (
        <li className='flex-none' key={item.url}>
          <Link href={item.url}>
            <a className={`btn action-btn ${item.selected ? 'selected' : ''}`}>
              {item.name}
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

ListingAnchors.propTypes = propTypes;

export default ListingAnchors;
