import React from 'react';
import PropTypes from 'typedefs/proptypes';
import Meta from 'components/organisms/meta';
import PageTitle from 'components/atoms/pageTitle';
import SimpleCard from 'components/molecules/simpleCard';
import Shell from 'components/organisms/shell';

const propTypes = {
  pageContext: PropTypes.shape({
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
      description={ pageDescription }
    />
    <Shell>
      <PageTitle className='static-tite'>{ title }</PageTitle>
      <p className='page-sub-title'>{ subtitle }</p>
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
