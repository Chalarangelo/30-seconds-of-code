import PropTypes from 'typedefs/proptypes';
import PreviewCard from 'components/molecules/previewCard';
import CollectionChip from 'components/molecules/collectionChip';
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
  return snippetList.length || hasCollection ? (
    <>
      <PageTitle className='recommendation-list-title f-center'>
        {literals.recommendedSnippets}
        {hasCollection ? (
          <span dangerouslySetInnerHTML={{ __html: literals.andCollections }} />
        ) : null}
      </PageTitle>
      <ul className='list-section'>
        {hasCollection ? (
          <CollectionChip
            key={`collection_${collectionChip.url}`}
            chip={collectionChip}
          />
        ) : null}
        {snippetList.map(snippet => (
          <PreviewCard key={`snippet_${snippet.url}`} snippet={snippet} />
        ))}
      </ul>
    </>
  ) : null;
};

RecommendationList.propTypes = propTypes;

export default RecommendationList;
