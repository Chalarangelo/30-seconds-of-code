import React from 'react';
import Meta from 'components/atoms/meta';
import PageTitle from 'components/atoms/pageTitle';
import { AnchorButton } from 'components/atoms/button';
import PageBackdrop from 'components/molecules/pageBackdrop';
import Shell from 'components/organisms/shell';
import PropTypes from 'prop-types';
import _ from 'lang';
const _l = _('en');

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
        title={ _l('Page not found') }
      />
      <Shell
        logoSrc={ logoSrc }
        isSearch={ false }
        isListing={ false }
        withIcon={ true }
        withTitle={ true }
      >
        <PageTitle>{ _l('404') }</PageTitle>
        <PageBackdrop
          graphicName='page-not-found'
          mainText={ (
            <>
              <strong>{ _l('Page not found') }</strong>
              <br />
            </>
          ) }
          subText={ _l('Seems like you have reached a page that does not exist.') }
        >
          <AnchorButton
            link={ {
              url: '/',
              internal: true,
            } }
            className='btn-home icon icon-home'
          >
            { _l('Go home') }
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
