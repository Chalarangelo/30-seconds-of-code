import PropTypes from 'typedefs/proptypes';
import PageTitle from 'components/atoms/pageTitle';
import literals from 'lang/en/client/common';
import PreviewCardList from 'components/organisms/previewCardList';

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
      <PreviewCardList contentItems={recommendations} />
    </>
  ) : null;
};

RecommendationList.propTypes = propTypes;

export default RecommendationList;
