import React from 'react';
import PropTypes from 'typedefs/proptypes';
import { connect } from 'react-redux';
import Meta from 'components/organisms/meta';
import Breadcrumbs from 'components/molecules/breadcrumbs';
import Shell from 'components/organisms/shell';
import SnippetCard from 'components/organisms/snippetCard';
import RecommendationList from 'components/organisms/recommendationList';
import CTA from 'components/molecules/cta';

const propTypes = {
  pageContext: PropTypes.shape({
    snippet: PropTypes.snippet.isRequired,
    logoSrc: PropTypes.string.isRequired,
    splashLogoSrc: PropTypes.string.isRequired,
    cardTemplate: PropTypes.string,
    recommendedSnippets: PropTypes.arrayOf(PropTypes.snippet),
    pageDescription: PropTypes.string.isRequired,
    breadcrumbs: PropTypes.arrayOf(
      PropTypes.shape({
        link: PropTypes.link,
        name: PropTypes.string,
      })
    ),
  }),
  lastPageTitle: PropTypes.string.isRequired,
  lastPageUrl: PropTypes.string.isRequired,
};

/**
 * Renders a snippet page.
 * Used to render all snippet pages on the website.
 */
const SnippetPage = ({
  pageContext: {
    snippet,
    logoSrc,
    splashLogoSrc,
    cardTemplate,
    recommendedSnippets = [],
    breadcrumbs,
    pageDescription,
  },
  lastPageTitle,
  lastPageUrl,
}) => (
  <>
    <Meta
      title={ snippet.title }
      description={ pageDescription }
      logoSrc={ cardTemplate === 'blog' ? snippet.cover.src : splashLogoSrc }
      structuredData={ {
        title: snippet.title,
        description: snippet.description,
        slug: snippet.slug,
        orgLogoSrc: logoSrc,
        firstSeen: snippet.firstSeen,
        lastUpdated: snippet.lastUpdated,
      } }
      breadcrumbsData={ breadcrumbs }
      canonical={ snippet.slug }
    />
    <Shell logoSrc={ logoSrc } >
      <Breadcrumbs
        lastPage={ {
          link: {
            url: lastPageUrl,
            internal: true,
          },
          name: lastPageTitle,
        } }
        breadcrumbs={ breadcrumbs }
      />
      <SnippetCard
        cardTemplate={ cardTemplate }
        snippet={ snippet }
      />
      <CTA/>
      <RecommendationList snippetList={ recommendedSnippets } />
    </Shell>
  </>
);

SnippetPage.propTypes = propTypes;

export default connect(
  state => ({
    lastPageTitle: state.navigation.lastPageTitle,
    lastPageUrl: state.navigation.lastPageUrl,
  }),
  null
)(SnippetPage);
