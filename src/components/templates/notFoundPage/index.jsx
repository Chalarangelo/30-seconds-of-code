import React from 'react';
import Meta from 'components/atoms/meta';
import PageTitle from 'components/atoms/pageTitle';
import { AnchorButton } from 'components/atoms/button';
import PageBackdrop from 'components/molecules/pageBackdrop';
import Shell from 'components/organisms/shell';
import PropTypes from 'prop-types';
import literals from 'lang/en/client/notFound';

/**
 * Renders the /404 page.
 */
const NotFoundPage = ({
  pageContext: {
    logoSrc,
    splashLogoSrc,
  },
}) => {
  return (
    <>
      <Meta
        logoSrc={ splashLogoSrc }
        title={ literals.pageNotFound }
      />
      <Shell
        logoSrc={ logoSrc }
        isSearch={ false }
        isListing={ false }
        withIcon={ true }
        withTitle={ true }
      >
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
          <AnchorButton
            link={ {
              url: '/',
              internal: true,
            } }
            className='btn-home icon icon-home'
          >
            { literals.goHome }
          </AnchorButton>
        </PageBackdrop>
      </Shell>
    </>
  );
};

NotFoundPage.propTypes = {
  /** pageContext is passed from Gatsby to the page */
  pageContext: PropTypes.shape({
    /** URI for the logo image */
    logoSrc: PropTypes.string.isRequired,
    /** URI for the splash logo image */
    splashLogoSrc: PropTypes.string.isRequired,
  }),
};

export default NotFoundPage;
