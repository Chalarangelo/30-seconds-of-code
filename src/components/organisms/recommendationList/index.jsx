import PropTypes from 'typedefs/proptypes';
import PreviewCard from 'components/molecules/previewCard';
import PageTitle from 'components/atoms/pageTitle';
import literals from 'lang/en/client/common';

const propTypes = {
  snippetList: PropTypes.arrayOf(PropTypes.snippet),
  collectionChip: PropTypes.chip,
};

/**
 * Renders a list of recommended snippets.
 * Dependent on the `PreviewCard` component.
 */
const RecommendationList = ({ snippetList, collectionChip = null }) => {
  const hasCollection = Boolean(collectionChip);
  const recommendations = hasCollection
    ? [collectionChip, ...snippetList]
    : snippetList;

  return recommendations.length ? (
    <>
      <PageTitle className='recommendation-list-title f-center'>
        {literals.recommendedSnippets}
        {hasCollection ? (
          <span dangerouslySetInnerHTML={{ __html: literals.andCollections }} />
        ) : null}
      </PageTitle>
      <ul className='list-section'>
        {recommendations.map(contentItem => (
          <PreviewCard
            key={`recommendation_${contentItem.url}`}
            contentItem={contentItem}
          />
        ))}
      </ul>
    </>
  ) : null;
};

RecommendationList.propTypes = propTypes;

export default RecommendationList;
