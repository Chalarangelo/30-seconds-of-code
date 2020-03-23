import React from 'react';
import PropTypes from 'prop-types';
import PreviewCard from 'molecules/previewCard';
import PageSubtitle from 'atoms/pageSubtitle';
import { Snippet as SnippetPropType } from 'typedefs';
import _ from 'lang';
const _l = _('en');

const RecommendationList = ({
  snippetList,
}) => {
  return snippetList.length ? (
    <>
      <PageSubtitle isLight className='recommendation-list-title'>
        { _l('Recommended snippets') }
      </PageSubtitle>
      { snippetList.map(snippet => (
        <PreviewCard
          key={ `snippet_${snippet.url}` }
          snippet={ snippet }
        />
      )) }
    </>
  ) : null;
};

RecommendationList.propTypes = {
  /** List of snippets to be displayed */
  snippetList: PropTypes.arrayOf(SnippetPropType),
};

export default RecommendationList;
