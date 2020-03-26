import React from 'react';
import PropTypes from 'prop-types';
import PreviewCard from 'components/molecules/previewCard';
import PageSubtitle from 'components/atoms/pageSubtitle';
import { Snippet as SnippetPropType } from 'typedefs';
import literals from 'lang/en/client/common';

const RecommendationList = ({
  snippetList,
}) => {
  return snippetList.length ? (
    <>
      <PageSubtitle isLight className='recommendation-list-title'>
        { literals.recommendedSnippets }
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
