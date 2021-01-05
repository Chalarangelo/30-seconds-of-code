import React from 'react';
import PropTypes from 'typedefs/proptypes';
import { connect } from 'react-redux';
import Meta from 'components/organisms/meta';
import Breadcrumbs from 'components/molecules/breadcrumbs';
import Shell from 'components/organisms/shell';
import cardComponents from 'components/organisms/snippetCard';
import RecommendationList from 'components/organisms/recommendationList';
import CTA from 'components/molecules/cta';

const propTypes = {
  pageContext: PropTypes.shape({
    snippet: PropTypes.snippet.isRequired,
    cardTemplate: PropTypes.string,
    recommendedSnippets: PropTypes.arrayOf(PropTypes.snippet),
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
    breadcrumbs,
    pageDescription,
  },
  pageContext,
}) => {
  const SnippetCard = cardComponents[cardTemplate];
  return (
    <>
      <Meta
        title={snippet.title}
        description={pageDescription}
        logoSrc={cardTemplate === 'BlogSnippetCard' ? snippet.cover : undefined}
        structuredData={{
          title: snippet.title,
          description: snippet.description,
          slug: snippet.slug,
          orgLogoSrc: '/assets/30s-icon.png',
          firstSeen: snippet.firstSeen,
          lastUpdated: snippet.lastUpdated,
          type: 'snippet',
        }}
        breadcrumbsData={breadcrumbs}
        canonical={snippet.slug}
      />
      <Shell
        pageContext={process.env.ENV === 'development' ? pageContext : null}
      >
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <SnippetCard snippet={snippet} />
        <CTA />
        <RecommendationList snippetList={recommendedSnippets} />
      </Shell>
    </>
  );
};

SnippetPage.propTypes = propTypes;

export default SnippetPage;
