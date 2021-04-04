import React from 'react';
import PropTypes from 'typedefs/proptypes';
import Paginator from 'components/molecules/paginator';
import Sorter from 'components/molecules/sorter';
import PageTitle from 'components/atoms/pageTitle';
import PreviewCard from 'components/molecules/previewCard';
import ListingAnchors from 'components/molecules/listingAnchors';
import combineClassNames from '@chalarangelo/combine-class-names';

const propTypes = {
  snippetList: PropTypes.arrayOf(PropTypes.snippet),
  paginator: PropTypes.paginator,
  sorter: PropTypes.sorter,
  listingName: PropTypes.string,
  listingDescription: PropTypes.string,
  listingImage: PropTypes.string,
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
  listingDescription = '',
  listingImage = '',
  listingType,
  listingSublinks = [],
}) => {
  /* istanbul ignore next */
  const isMainOrListing = listingType === 'main';
  const withSorter = sorter && sorter.orders && sorter.orders.length > 1;

  return snippetList.length ? (
    <>
      {isMainOrListing ? (
        <>
          <PageTitle className={withSorter ? 'with-sorter' : null}>
            {listingName}
          </PageTitle>
          <Sorter sorter={sorter} />
        </>
      ) : (
        <>
          <div
            className={combineClassNames`snippet-list-header ${
              listingImage ? 'with-image' : ''
            }`}
          >
            {listingImage ? (
              <img
                className='snippet-list-splash-image'
                src={listingImage}
                alt=''
                height='360'
                width='360'
              />
            ) : null}
            <div>
              <PageTitle>{listingName}</PageTitle>
              {listingDescription && listingDescription.length ? (
                <p className='snippet-list-description txt-100'>
                  {listingDescription}
                </p>
              ) : null}
            </div>
          </div>
          <div className='snippet-list-controls a-center'>
            {listingSublinks.length ? (
              <ListingAnchors items={listingSublinks} />
            ) : null}
            <Sorter sorter={sorter} />
          </div>
        </>
      )}
      <ul className='list-section'>
        {snippetList.map(snippet => (
          <PreviewCard key={`snippet_${snippet.url}`} snippet={snippet} />
        ))}
      </ul>
      <Paginator paginator={paginator} />
    </>
  ) : null;
};

SnippetList.propTypes = propTypes;

export default SnippetList;
