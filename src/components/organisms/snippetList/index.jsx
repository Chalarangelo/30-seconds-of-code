import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Paginator from 'components/molecules/paginator';
import Sorter from 'components/molecules/sorter';
import PageTitle from 'components/atoms/pageTitle';
import PreviewCard from 'components/molecules/previewCard';
import CTA from 'components/organisms/cta';
import ListingAnchors from 'components/molecules/listingAnchors';
import {
  Snippet as SnippetPropType,
  Paginator as PaginatorPropType
} from 'typedefs';

const propTypes = {
  snippetList: PropTypes.arrayOf(SnippetPropType),
  paginator: PaginatorPropType,
  sorter: PaginatorPropType,
  listingName: PropTypes.string,
  listingType: PropTypes.string,
  listingSublinks: PropTypes.arrayOf(PropTypes.shape({})),
};

/**
 * Renders a list of snippets along with necessary controls.
 * Used in listing page.
 * Dependent on multiple components.
 */
const SnippetList = ({
  snippetList,
  paginator,
  sorter,
  listingName,
  listingType,
  listingSublinks = [],
}) => {
  /* istanbul ignore next */
  const ctaIndex = snippetList.length > 20
    ? Math.floor(snippetList.length * 0.55)
    : snippetList.length - 1;
  return snippetList.length ? (
    <>
      {
        listingSublinks.length
          ? <ListingAnchors isCompact={ listingType !== 'main' } items={ listingSublinks } />
          : null
      }
      <PageTitle isLight className='with-sorter'>
        { listingName }
      </PageTitle>
      <Sorter sorter={ sorter } />
      { snippetList.map((snippet, i) => (
        <Fragment key={ `snippet_${snippet.url}` }>
          <PreviewCard
            snippet={ snippet }
            context={ listingType }
          />
          { i === ctaIndex ? <CTA /> : null }
        </Fragment>
      )) }
      <Paginator paginator={ paginator } />
    </>
  ) : null;
};

SnippetList.propTypes = propTypes;

export default SnippetList;
