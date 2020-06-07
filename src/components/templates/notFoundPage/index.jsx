import React from 'react';
import PropTypes from 'typedefs/proptypes';
import Meta from 'components/organisms/meta';
import PageTitle from 'components/atoms/pageTitle';
import PageBackdrop from 'components/atoms/pageBackdrop';
import Shell from 'components/organisms/shell';
import literals from 'lang/en/client/notFound';

const propTypes = {
  pageContext: PropTypes.shape({
    logoSrc: PropTypes.string.isRequired,
    splashLogoSrc: PropTypes.string.isRequired,
  }),
};

/**
 * Renders a not found page.
 * Responsible for rendering the /404 page.
 */
const NotFoundPage = ({
  pageContext: {
    logoSrc,
    splashLogoSrc,
  },
}) => (
  <>
    <Meta
      logoSrc={ splashLogoSrc }
      title={ literals.pageNotFound }
    />
    <Shell logoSrc={ logoSrc } >
      <PageTitle>{ literals.fourOhFour }</PageTitle>
      <PageBackdrop
        graphicName='page-not-found'
        mainText={ (
          <>
            <strong>{ literals.pageNotFound }</strong>
            <br />
          </>
        ) }
        subText={ literals.notFoundDescription }
      >
        <a
          className='btn btn-home icon icon-home'
          href='/'
        >
          { literals.goHome }
        </a>
      </PageBackdrop>
    </Shell>
  </>
);

NotFoundPage.propTypes = propTypes;

export default NotFoundPage;
