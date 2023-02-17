import Link from 'next/link';

/**
 * Renders a pagination component.
 * @param {object} paginator - Pagination data for the component.
 */
const Paginator = ({ paginator }) => {
  if (!paginator) return null;

  const { previous, pages, next } = paginator;

  return (
    <div className='paginator mt-7 mx-auto mb-6 a-center grid j-center'>
      {previous ? (
        <Link href={previous.url}>
          <a
            className='btn action-btn previous-page j-center fs-no md:fs-sm icon icon-chevron-left box-border before:fs-md'
            rel='prev'
          >
            {previous.label}
          </a>
        </Link>
      ) : (
        <div />
      )}
      <div className='flex a-center'>
        {pages.map(({ label, url, current }) =>
          current ? (
            <span className='fs-xl box-border' key={label}>
              {label}
            </span>
          ) : (
            <Link key={label} href={url}>
              <a className='btn action-btn fs-md box-border'>{label}</a>
            </Link>
          )
        )}
      </div>
      {next ? (
        <Link href={next.url}>
          <a
            className='btn action-btn next-page j-center fs-no md:fs-sm icon icon-chevron-right box-border before:fs-md'
            rel='next'
          >
            {next.label}
          </a>
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
};

export default Paginator;
