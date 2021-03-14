import React from 'react';
import PropTypes from 'typedefs/proptypes';
import PreviewCard from 'components/molecules/previewCard';
import PageTitle from 'components/atoms/pageTitle';
import literals from 'lang/en/client/common';

const propTypes = {
  snippetList: PropTypes.arrayOf(PropTypes.snippet),
};

/**
 * Renders a list of recommended snippets.
 * Dependent on the `PreviewCard` component.
 */
const RecommendationList = ({ snippetList }) => {
  return snippetList.length ? (
    <>
      <PageTitle className='recommendation-list-title f-center'>
        {literals.recommendedSnippets}
      </PageTitle>
      <ul className='list-section'>
        {snippetList.map(snippet => (
          <PreviewCard key={`snippet_${snippet.url}`} snippet={snippet} />
        ))}
      </ul>
    </>
  ) : null;
};

RecommendationList.propTypes = propTypes;

export default RecommendationList;
