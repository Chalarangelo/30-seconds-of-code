import React from 'react';
import PropTypes from 'typedefs/proptypes';
import PreviewCard from 'components/molecules/previewCard';
import PageSubtitle from 'components/atoms/pageSubtitle';
import literals from 'lang/en/client/common';

const propTypes = {
  snippetList: PropTypes.arrayOf(PropTypes.snippet),
};

/**
 * Renders a list of recommended snippets.
 * Dependent on the `PageSubtitle` and `PreviewCard` components.
 */
const RecommendationList = ({
  snippetList,
}) => {
  return snippetList.length ? (
    <>
      <PageSubtitle isLight className='recommendation-list-title'>
        { literals.recommendedSnippets }
      </PageSubtitle>
      <ul className='recommendation-list'>
        { snippetList.map(snippet => (
          <PreviewCard
            key={ `snippet_${snippet.url}` }
            snippet={ snippet }
          />
        )) }
      </ul>
    </>
  ) : null;
};

RecommendationList.propTypes = propTypes;

export default RecommendationList;
