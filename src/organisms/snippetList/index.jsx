import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Paginator from 'molecules/paginator';
import Sorter from 'molecules/sorter';
import PageTitle from 'atoms/pageTitle';
import PageSubtitle from 'atoms/pageSubtitle';
import PreviewCard from 'molecules/previewCard';
import CTA from 'organisms/cta';
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
  sorter,
  listingName,
  listingType,
  listingSublinks = [],
  acceptsCookies,
}) => {
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
        <>
          <PreviewCard
            key={ `snippet_${snippet.url}` }
            snippet={ snippet }
            context={ listingType }
          />
          {
            i === ctaIndex ?
              <CTA
                onlySocial
                acceptsCookies={ acceptsCookies }
              />
              : null
          }
        </>
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
  /** Sorter component data */
  sorter: PaginatorPropType,
  /** Name of this snippet list */
  listingName: PropTypes.string,
  /** Type of this snippet list */
  listingType: PropTypes.string,
  /** Links to sublists */
  listingSublinks: PropTypes.arrayOf(PropTypes.shape({})),
  /** Does the user accept cookies? */
  acceptsCookies: PropTypes.bool,
};

export default connect(
  state => ({
    acceptsCookies: state.shell.acceptsCookies,
  }),
  null
)(SnippetList);
