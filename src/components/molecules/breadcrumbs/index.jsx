import React from 'react';
import PropTypes from 'typedefs/proptypes';

const breadcrumbPropTypes = {
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      name: PropTypes.string,
    })
  ),
  lastPage: PropTypes.shape({
    url: PropTypes.string,
    name: PropTypes.string,
  }),
};

/**
 * Breadcrumbs component for linking back to the previous page.
 */
const Breadcrumbs = ({
  breadcrumbs,
  lastPage,
}) => {
  if(
    breadcrumbs.length === 1 && lastPage.name.length &&
    breadcrumbs[0].name.toLowerCase() !== lastPage.name.toLowerCase() &&
    breadcrumbs[0].name.toLowerCase() === 'blog'
  ) {
    if (lastPage.url.includes('/t/')) {
      const orderingSegment = lastPage.url.includes('/a/')
        ? '/a/' : lastPage.url.includes('/e/')
          ? '/e/' : '/p/';
      const lastPageName = lastPage.name.split(' ').slice(1);
      const firstPageUrl = `${lastPage.url.slice(0, lastPage.url.indexOf('/t/'))}/p/1`;
      const firstPageName = lastPage.name.split(' ').slice(0, 1);
      return (
        <>
          <a
            className='link-back icon icon-arrow-left has-more'
            href={ firstPageUrl.replace('/p/', orderingSegment) }
          >
            { firstPageName }
          </a>
          { ' / ' }
          <a
            className='link-back-more'
            href={ lastPage.url }
          >
            { lastPageName }
          </a>
        </>
      );
    } else {
      return (
        <a
          className='link-back icon icon-arrow-left'
          href={ lastPage.url }
        >
          { lastPage.name }
        </a>
      );
    }
  } else if(
    lastPage.url.includes('search') ||
    lastPage.name.toLowerCase() === 'snippet list' ||
    lastPage.name.toLowerCase() === breadcrumbs[0].name.toLowerCase()
  ) {
    return (
      <a
        className='link-back icon icon-arrow-left'
        href={ lastPage.url }
      >
        { lastPage.name }
      </a>
    );
  } else if (breadcrumbs.length > 1 && lastPage.name.toLowerCase() === breadcrumbs[1].name.toLowerCase()) {
    const orderingSegment = lastPage.url.includes('/a/')
      ? '/a/' : lastPage.url.includes('/e/')
        ? '/e/' : '/p/';
    const lastPageName = lastPage.name.includes(breadcrumbs[0].name)
      ? lastPage.name.slice(breadcrumbs[0].name.length + 1) : lastPage.name;
    return (
      <>
        <a
          className='link-back icon icon-arrow-left has-more'
          href={ breadcrumbs[0].url.replace('/p/', orderingSegment) }
        >
          { breadcrumbs[0].name }
        </a>
        { ' / ' }
        <a
          className='link-back-more'
          href={ lastPage.url }
        >
          { lastPageName }
        </a>
      </>
    );
  } else {
    return (
      <>
        <a
          className='link-back icon icon-arrow-left has-more'
          href={ breadcrumbs[0].url }
        >
          { breadcrumbs[0].name }
        </a>
        { breadcrumbs.length > 1 && ' / ' }
        { breadcrumbs.length > 1 &&
          <a
            className='link-back-more'
            href={ breadcrumbs[1].url }
          >
            { breadcrumbs[1].name.includes(breadcrumbs[0].name)
              ? breadcrumbs[1].name.slice(breadcrumbs[0].name.length + 1)
              : breadcrumbs[1].name
            }
          </a>
        }
      </>
    );
  }
};

Breadcrumbs.propTypes = breadcrumbPropTypes;

export default Breadcrumbs;
