import Link from 'next/link';

/**
 * Breadcrumbs component for linking to the hierarchy of pages.
 */
const Breadcrumbs = ({ breadcrumbs }) => (
  <nav aria-label='breadcrumbs' className='breadcrumbs mt-4 mx-4 mb-0'>
    <ol className='flex m-0 p-0 f-ellipsis'>
      {breadcrumbs.map(({ name, url }, i) => {
        const isCurrentPage = i === breadcrumbs.length - 1;
        return (
          <li
            key={`breadcrumb-${i}`}
            className={`breadcrumb-item relative inline-block ${
              isCurrentPage ? 'txt-050 fs-no md:fs-sm f-ellipsis' : 'txt-150'
            }`}
          >
            <Link href={url}>
              <a
                className='inherit'
                aria-current={isCurrentPage ? 'page' : null}
              >
                {name}
              </a>
            </Link>
          </li>
        );
      })}
    </ol>
  </nav>
);

export default Breadcrumbs;
