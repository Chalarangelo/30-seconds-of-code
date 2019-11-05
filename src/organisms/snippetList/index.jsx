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
}) => {
  // TODO: Expect a title for the page so that you can render tag pages etc.
  // TODO: Consider adding a linkback here?
  return snippetList.length ? (
    <>
      <PageTitle isLight>
        { _l('Snippet List') }
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
};

export default SnippetList;
