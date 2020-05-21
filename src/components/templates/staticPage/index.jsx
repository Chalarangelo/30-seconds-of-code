import React from 'react';
import PropTypes from 'typedefs/proptypes';
import Meta from 'components/organisms/meta';
import PageTitle from 'components/atoms/pageTitle';
import PageSubtitle from 'components/atoms/pageSubtitle';
import SimpleCard from 'components/molecules/simpleCard';
import Shell from 'components/organisms/shell';

const propTypes = {
  pageContext: PropTypes.shape({
    /** URI for the logo image */
    logoSrc: PropTypes.string.isRequired,
    splashLogoSrc: PropTypes.string.isRequired,
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

/**
 * Renders a static page from the given data.
 * Responsible for rendering the /about and /cookies pages.
 * @param {object} stringLiterals - An object with all the necessary information
 *   for rendering this page. The `cards` array will hold title+html pairs for
 *   each `SimpleCard` rendered.
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
}) => (
  <>
    <Meta
      title={ title }
      logoSrc={ splashLogoSrc }
      description={ pageDescription }
    />
    <Shell logoSrc={ logoSrc } >
      <PageTitle>{ title }</PageTitle>
      <PageSubtitle isLight>{ subtitle }</PageSubtitle>
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

StaticPage.propTypes = propTypes;

export default StaticPage;
