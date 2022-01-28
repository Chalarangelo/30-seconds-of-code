import PageTitle from 'components/atoms/pageTitle';
import literals from 'lang/en/client/common';
import PreviewCardList from 'components/organisms/previewCardList';

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
      <PreviewCardList
        contentItems={recommendations}
        fromParam='recommendations'
      />
    </>
  ) : null;
};

export default RecommendationList;
