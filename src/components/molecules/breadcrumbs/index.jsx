import React from 'react';
import PropTypes from 'typedefs/proptypes';

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
          <a
            href={url}
            aria-current={i === breadcrumbs.length - 1 ? 'page' : null}
          >
            {name}
          </a>
        </li>
      ))}
    </ol>
  </nav>
);

Breadcrumbs.propTypes = breadcrumbPropTypes;

export default Breadcrumbs;
