import PropTypes from 'typedefs/proptypes';
import Link from 'next/link';

const breadcrumbPropTypes = {
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      name: PropTypes.string,
    })
  ),
};

/**
 * Breadcrumbs component for linking to the hierarchy of pages.
 */
const Breadcrumbs = ({ breadcrumbs }) => (
  <nav aria-label='breadcrumbs' className='breadcrumbs'>
    <ol className='flex m-0'>
      {breadcrumbs.map(({ name, url }, i) => (
        <li key={`breadcrumb-${i}`} className='breadcrumb-item inline-block'>
          <Link href={url}>
            <a aria-current={i === breadcrumbs.length - 1 ? 'page' : null}>
              {name}
            </a>
          </Link>
        </li>
      ))}
    </ol>
  </nav>
);

Breadcrumbs.propTypes = breadcrumbPropTypes;

export default Breadcrumbs;
