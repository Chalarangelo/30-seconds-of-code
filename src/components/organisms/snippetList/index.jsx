import React from 'react';
import PropTypes from 'typedefs/proptypes';
import Paginator from 'components/molecules/paginator';
import Sorter from 'components/molecules/sorter';
import PageTitle from 'components/atoms/pageTitle';
import PreviewCard from 'components/molecules/previewCard';
import CTA from 'components/organisms/cta';
import ListingAnchors from 'components/molecules/listingAnchors';
import { insertAt } from 'utils';

const propTypes = {
  snippetList: PropTypes.arrayOf(PropTypes.snippet),
  paginator: PropTypes.paginator,
  sorter: PropTypes.sorter,
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
      <ul className='snippet-list'>
        { insertAt(
          ctaIndex,
          <li key='cta' >
            <CTA/>
          </li>,
          snippetList.map(snippet =>
            <PreviewCard
              key={ `snippet_${snippet.url}` }
              snippet={ snippet }
            />
          )
        ) }
      </ul>
      <Paginator paginator={ paginator } />
    </>
  ) : null;
};

SnippetList.propTypes = propTypes;

export default SnippetList;
