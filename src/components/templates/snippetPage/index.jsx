import React from 'react';
import PropTypes from 'typedefs/proptypes';
import Meta from 'components/organisms/meta';
import Breadcrumbs from 'components/molecules/breadcrumbs';
import Shell from 'components/organisms/shell';
import cardComponents from 'components/organisms/snippetCard';
import RecommendationList from 'components/organisms/recommendationList';

const propTypes = {
  pageContext: PropTypes.shape({
    snippet: PropTypes.snippet.isRequired,
    cardTemplate: PropTypes.string,
    recommendedSnippets: PropTypes.arrayOf(PropTypes.snippet),
    recommendedCollection: PropTypes.chip,
    pageDescription: PropTypes.string.isRequired,
    breadcrumbs: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string,
        name: PropTypes.string,
      })
    ),
  }),
};

/**
 * Renders a snippet page.
 * Used to render all snippet pages on the website.
 */
const SnippetPage = ({
  pageContext: {
    snippet,
    cardTemplate,
    recommendedSnippets = [],
    recommendedCollection,
    breadcrumbs,
    pageDescription,
  },
  pageContext,
}) => {
  const SnippetCard = cardComponents[cardTemplate];
  const isBlogSnippet = cardTemplate === 'BlogSnippetCard';
  return (
    <>
      <Meta
        title={snippet.title}
        description={pageDescription}
        logoSrc={isBlogSnippet ? snippet.cover : undefined}
        structuredData={{
          title: snippet.title,
          description: snippet.description,
          slug: snippet.slug,
          orgLogoSrc: '/assets/30s-icon.png',
          firstSeen: snippet.firstSeen,
          lastUpdated: snippet.lastUpdated,
          type: 'snippet',
          ...(isBlogSnippet
            ? {
                author: {
                  name: snippet.authors[0].name,
                  url: snippet.authors[0].profile,
                },
              }
            : {}),
        }}
        breadcrumbsData={breadcrumbs}
        canonical={snippet.slug}
      />
      <Shell
        pageContext={
          process.env.NODE_ENV === 'development' ? pageContext : null
        }
      >
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

SnippetPage.propTypes = propTypes;

export default SnippetPage;
