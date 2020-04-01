import React from 'react';
import PropTypes from 'prop-types';
import PreviewCard from 'components/molecules/previewCard';
import PageSubtitle from 'components/atoms/pageSubtitle';
import { Snippet as SnippetPropType } from 'typedefs';
import literals from 'lang/en/client/common';

const propTypes = {
  snippetList: PropTypes.arrayOf(SnippetPropType),
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
      { snippetList.map(snippet => (
        <PreviewCard
          key={ `snippet_${snippet.url}` }
          snippet={ snippet }
        />
      )) }
    </>
  ) : null;
};

RecommendationList.propTypes = propTypes;

export default RecommendationList;
