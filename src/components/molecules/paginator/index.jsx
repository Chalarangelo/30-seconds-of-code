import Link from 'next/link';

/**
 * Renders a pagination component.
 * @param {object} paginator - Pagination data for the component.
 */
const Paginator = ({ paginator }) => {
  if (!paginator) return null;

  const { previous, pages, next } = paginator;

  return (
    <div className='paginator gap-2 mt-7 mx-auto mb-6 a-center grid j-center'>
      {previous ? (
        <Link href={previous.url}>
          <a
            className='btn action-btn previous-page gap-1 j-center fs-no md:fs-sm icon icon-chevron-left box-border before:fs-md f-center'
            rel='prev'
          >
            {previous.label}
          </a>
        </Link>
      ) : (
        <div />
      )}
      <div className='flex a-center gap-2'>
        {pages.map(({ label, url, current }) =>
          current ? (
            <span className='fs-xl box-border f-center' key={label}>
              {label}
            </span>
          ) : (
            <Link key={label} href={url}>
              <a className='btn action-btn fs-md box-border f-center'>
                {label}
              </a>
            </Link>
          )
        )}
      </div>
      {next ? (
        <Link href={next.url}>
          <a
            className='btn action-btn next-page gap-1 j-center fs-no md:fs-sm icon icon-chevron-right box-border before:fs-md f-center'
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
