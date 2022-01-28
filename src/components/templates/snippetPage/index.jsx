import Meta from 'components/organisms/meta';
import Breadcrumbs from 'components/atoms/breadcrumbs';
import Shell from 'components/organisms/shell';
import cardComponents from 'components/organisms/snippetCard';
import RecommendationList from 'components/organisms/recommendationList';

/**
 * Renders a snippet page.
 * Used to render all snippet pages on the website.
 */
const SnippetPage = ({
  snippet,
  cardTemplate,
  recommendedSnippets = [],
  recommendedCollection,
  breadcrumbs,
  pageDescription,
  structuredData,
}) => {
  const SnippetCard = cardComponents[cardTemplate];
  const isBlogSnippet = cardTemplate === 'BlogSnippetCard';
  return (
    <>
      <Meta
        title={snippet.title}
        description={pageDescription}
        logoSrc={isBlogSnippet ? snippet.cover : undefined}
        structuredData={structuredData}
        breadcrumbsData={breadcrumbs}
        canonical={snippet.slug}
      />
      <Shell>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <SnippetCard snippet={snippet} />
        <RecommendationList
          snippetList={recommendedSnippets}
          collectionChip={recommendedCollection}
        />
      </Shell>
    </>
  );
};

export default SnippetPage;
