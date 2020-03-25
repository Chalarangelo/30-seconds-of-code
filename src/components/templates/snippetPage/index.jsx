import React from 'react';
import { connect } from 'react-redux';
import Meta from 'components/atoms/meta';
import Breadcrumbs from 'components/atoms/breadcrumbs';
import Shell from 'components/organisms/shell';
import SnippetCard from 'components/organisms/snippetCard';
import RecommendationList from 'components/organisms/recommendationList';
import CTA from 'components/organisms/cta';
import { Snippet as SnippetPropType, Link as LinkPropType } from 'typedefs';
import PropTypes from 'prop-types';
import _ from 'lang';
const _l = _('en');

// Used to produce a description
const templateData = {
  pageType: 'snippet',
};

const determineDescription = (snippet, cardTemplate) =>
  (cardTemplate === 'blog') ? snippet.description :
    _l`site.pageDescription${{...templateData, snippetName: snippet.title, snippetLanguage: snippet.language.long }}`;

/**
 * Renders snippet pages.
 */
const SnippetPage = ({
  pageContext: {
    snippet,
    logoSrc,
    splashLogoSrc,
    cardTemplate,
    recommendedSnippets = [],
    breadcrumbs,
  },
  lastPageTitle,
  lastPageUrl,
  acceptsCookies,
}) => {
  return (
    <>
      <Meta
        title={ snippet.title }
        description={ determineDescription(snippet, cardTemplate) }
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
      <Shell
        logoSrc={ logoSrc }
        isSearch={ false }
        isListing={ false }
        externalUrl={ snippet.url }
      >
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
        <CTA
          onlySocial={ cardTemplate === 'blog' }
          snippetUrl={ snippet.url.split('/').slice(0, 5).join('/') }
          acceptsCookies={ acceptsCookies }
        />
        <RecommendationList snippetList={ recommendedSnippets } />
      </Shell>
    </>
  )
  ;
};

SnippetPage.propTypes = {
  /** pageContext is passed from Gatsby to the page */
  pageContext: PropTypes.shape({
    /** Snippet data for the card */
    snippet: SnippetPropType.isRequired,
    /** URI for the logo image */
    logoSrc: PropTypes.string.isRequired,
    /** URI for the splash logo image */
    splashLogoSrc: PropTypes.string.isRequired,
    /** Card template for the snippet card of this page */
    cardTemplate: PropTypes.string,
    /** List of recommended snippets */
    recommendedSnippets: PropTypes.arrayOf(SnippetPropType),
    /** Breadcrumbs data */
    breadcrumbs: PropTypes.arrayOf(
      PropTypes.shape({
        link: LinkPropType,
        name: PropTypes.string,
      })
    ),
  }),
  /** Title of the last page */
  lastPageTitle: PropTypes.string.isRequired,
  /** URL of the last page */
  lastPageUrl: PropTypes.string.isRequired,
  /** Does the user accept cookies? */
  acceptsCookies: PropTypes.bool,
};

export default connect(
  state => ({
    lastPageTitle: state.navigation.lastPageTitle,
    lastPageUrl: state.navigation.lastPageUrl,
    acceptsCookies: state.shell.acceptsCookies,
  }),
  null
)(SnippetPage);
