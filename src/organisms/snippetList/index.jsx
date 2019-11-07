import React from 'react';
import PropTypes from 'prop-types';
import Paginator from 'molecules/paginator';
import PageTitle from 'atoms/pageTitle';
import PageSubtitle from 'atoms/pageSubtitle';
import PreviewCard from 'molecules/previewCard';
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
}) => {
  return snippetList.length ? (
    <>
      <PageTitle isLight>
        { listingName }
      </PageTitle>
      <PageSubtitle isLight>
        { _l('Click on a snippet card to view the snippet.') }
      </PageSubtitle>
      { snippetList.map(snippet => (
        <PreviewCard
          key={ `snippet_${snippet.url}` }
          snippet={ snippet }
        />
      )) }
      <Paginator paginator={ paginator } />
    </>
  ) : null; // TODO: Show loader
};

SnippetList.propTypes = {
  /** List of snippets to be displayed */
  snippetList: PropTypes.arrayOf(SnippetPropType),
  /** Paginator component data */
  paginator: PaginatorPropType,
  /** Name of this snippet list */
  listingName: PropTypes.string,
};

export default SnippetList;
