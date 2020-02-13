import React from 'react';
import PropTypes from 'prop-types';
import Paginator from 'molecules/paginator';
import PageTitle from 'atoms/pageTitle';
import PageSubtitle from 'atoms/pageSubtitle';
import PreviewCard from 'molecules/previewCard';
import ListingAnchors from 'molecules/listingAnchors';
import {
  Snippet as SnippetPropType,
  Paginator as PaginatorPropType
} from 'typedefs';
import _ from 'lang';
const _l = _('en');

// eslint-disable-next-line complexity
const SnippetList = ({
  snippetList,
  paginator,
  listingName,
  listingType,
  listingSublinks = [],
}) => {
  return snippetList.length ? (
    <>
      {
        listingSublinks.length
          ? <ListingAnchors isCompact={ listingType !== 'main' } items={ listingSublinks } />
          : null
      }
      <PageTitle isLight>
        { listingName }
      </PageTitle>
      { snippetList.map(snippet => (
        <PreviewCard
          key={ `snippet_${snippet.url}` }
          snippet={ snippet }
          context={ listingType }
        />
      )) }
      <Paginator paginator={ paginator } />
    </>
  ) : null;
};

SnippetList.propTypes = {
  /** List of snippets to be displayed */
  snippetList: PropTypes.arrayOf(SnippetPropType),
  /** Paginator component data */
  paginator: PaginatorPropType,
  /** Name of this snippet list */
  listingName: PropTypes.string,
  /** Type of this snippet list */
  listingType: PropTypes.string,
  /** Links to sublists */
  listingSublinks: PropTypes.arrayOf(PropTypes.shape({})),
};

export default SnippetList;
