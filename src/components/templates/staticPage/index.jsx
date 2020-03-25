import React from 'react';
import Meta from 'components/atoms/meta';
import PageTitle from 'components/atoms/pageTitle';
import PageSubtitle from 'components/atoms/pageSubtitle';
import SimpleCard from 'components/molecules/simpleCard';
import Shell from 'components/organisms/shell';
import PropTypes from 'prop-types';

/**
 * Renders the /about and /cookies pages.
 */
const StaticPage = ({
  pageContext: {
    logoSrc,
    splashLogoSrc,
    stringLiterals: {
      title,
      subtitle,
      pageDescription,
      cards,
    },
  },
}) => {
  return (
    <>
      <Meta
        title={ title }
        logoSrc={ splashLogoSrc }
        description={ pageDescription }
      />
      <Shell
        logoSrc={ logoSrc }
        isSearch={ false }
        isListing={ false }
        withIcon
        withTitle
      >
        <PageTitle>
          { title }
        </PageTitle>
        <PageSubtitle isLight>
          { subtitle }
        </PageSubtitle>
        {
          cards.map(({ title, html }, i) => (
            <SimpleCard
              key={ i }
              title={ title }
              dangerouslySetInnerHTML={ {__html: html} }
            />
          ))
        }
      </Shell>
    </>
  );
};

StaticPage.propTypes = {
  /** pageContext is passed from Gatsby to the page */
  pageContext: PropTypes.shape({
    /** URI for the logo image */
    logoSrc: PropTypes.string.isRequired,
    /** URI for the splash logo image */
    splashLogoSrc: PropTypes.string.isRequired,
    /** String literals for the page */
    stringLiterals: PropTypes.shape({
      title: PropTypes.string,
      pageDescription: PropTypes.string,
      subtitle: PropTypes.string,
      cards: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        html: PropTypes.string,
      })),
    }).isRequired,
  }),
};

export default StaticPage;
