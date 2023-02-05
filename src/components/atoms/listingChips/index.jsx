import Link from 'next/link';

const ListingChips = ({ items = [] }) => (
  <ul className='list-section listing-chips flex pb-1 my-2 mx-3.5 g-c2'>
    {items.map(item => (
      <li className='flex-none fs-sm md:fs-md' key={item.url}>
        <Link href={item.url}>
          <a className={`btn action-btn ${item.selected ? 'selected' : ''}`}>
            {item.title}
          </a>
        </Link>
      </li>
    ))}
  </ul>
);

export default ListingChips;
