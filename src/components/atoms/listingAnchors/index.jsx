import { useEffect, useRef } from 'react';
import Link from 'next/link';

/**
 * Renders the set of buttons that link to other listing pages.
 * Used in Listing pages and Home page.
 */
const ListingAnchors = ({ items = [] }) => {
  const containerRef = useRef();
  const selectedRef = useRef();
  // Scroll the selected tag into view, so that users always know where they are
  useEffect(() => {
    if (!containerRef.current || !selectedRef.current) return;
    const selectedItemLeft =
      selectedRef.current.offsetLeft + selectedRef.current.offsetWidth;
    if (
      selectedItemLeft >
      containerRef.current.offsetWidth + containerRef.current.scrollLeft
    ) {
      containerRef.current.scrollTo(selectedItemLeft, 0);
    }
  }, []);

  return (
    <ul
      className='list-section listing-anchors flex pb-1 mt-1 mx-3.5 mb-6'
      ref={containerRef}
    >
      {items.map(item => (
        <li className='flex-none my-1 mx-0' key={item.url}>
          <Link href={item.url}>
            <a
              className={`btn action-btn ${item.selected ? 'selected' : ''}`}
              ref={item.selected ? selectedRef : undefined}
            >
              {item.name}
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default ListingAnchors;
