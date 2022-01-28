import Link from 'next/link';

/**
 * General-purpose collection chip.
 * Used in home page and collections page.
 * @param {object} chip - Collection chip object for the chip.
 */
const CollectionChip = ({ chip }) => (
  <li className='collection-chip srfc-01dp txt-200 br-xl'>
    <Link href={`${chip.url}?from=chips`}>
      <a
        className={`inherit relative py-2 px-1 f-center flex j-center a-center f-alt box-border icon icon-${chip.icon} before:fs-lg`}
      >
        {chip.title}
      </a>
    </Link>
  </li>
);

export default CollectionChip;
