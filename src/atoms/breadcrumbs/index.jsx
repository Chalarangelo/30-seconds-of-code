import React from 'react';
import { Anchor, LinkBackAnchor } from 'atoms/anchor';
import PropTypes from 'prop-types';
import { Link as LinkPropType } from 'typedefs';
import { trimWhiteSpace } from 'functions/utils';

/**
 * Breadcrumbs component for linking back to the previous page.
 */
const Breadcrumbs = ({
  breadcrumbs,
  lastPage,
  className,
  ...rest
}) => {
  if(
    lastPage.link.url.includes('search') ||
    lastPage.name.toLowerCase() === 'snippet list' ||
    lastPage.name.toLowerCase() === breadcrumbs[0].name.toLowerCase()
  ) {
    return (
      <LinkBackAnchor
        link={ lastPage.link }
      >
        { lastPage.name }
      </LinkBackAnchor>
    );
  } else if (lastPage.name.toLowerCase() === breadcrumbs[1].name.toLowerCase()) {
    const orderingSegment = lastPage.link.url.includes('a')
      ? '/a/' : lastPage.link.url.includes('e')
        ? '/e/' : '/p/';
    const lastPageName = lastPage.name.includes(breadcrumbs[0].name)
      ? lastPage.name.slice(breadcrumbs[0].name.length + 1) : lastPage.name;
    return (
      <>
        <LinkBackAnchor
          className='has-more'
          link={ {
            ...breadcrumbs[0].link,
            url: breadcrumbs[0].link.url.replace('/p/', orderingSegment),
          } }
        >
          { breadcrumbs[0].name }
        </LinkBackAnchor>
        { ' / ' }
        <Anchor
          className='link-back-more'
          link={ lastPage.link }
        >
          { lastPageName }
        </Anchor>
      </>
    );
  } else {
    return (
      <>
        <LinkBackAnchor
          className='has-more'
          link={ breadcrumbs[0].link }
        >
          { breadcrumbs[0].name }
        </LinkBackAnchor>
        { breadcrumbs.length > 1 && ' / ' }
        { breadcrumbs.length > 1 &&
          <Anchor
            className='link-back-more'
            link={ breadcrumbs[1].link }
          >
            { breadcrumbs[1].name.includes(breadcrumbs[0].name)
              ? breadcrumbs[1].name.slice(breadcrumbs[0].name.length + 1)
              : breadcrumbs[1].name
            }
          </Anchor>
        }
      </>
    );
  }
};


Breadcrumbs.propTypes = {
  /** Children elements */
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  /** Breadcrumbs data */
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      link: LinkPropType,
      name: PropTypes.string,
    })
  ),
  /** Last page data */
  lastPage: PropTypes.shape({
    link: LinkPropType,
    name: PropTypes.string,
  }),
  /** Any other props to be passed to the component */
  rest: PropTypes.any,
};

export default Breadcrumbs;
