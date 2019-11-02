import React from 'react';
import { connect } from 'react-redux';
import Meta from 'atoms/meta';
import Shell from 'organisms/shell';
import { AnchorButton } from 'atoms/button';
import PageBackdrop from 'molecules/pageBackdrop';
import PageTitle from 'atoms/pageTitle';
import PropTypes from 'prop-types';
import _ from 'lang';
const _l = _('en');

const NotFoundPage = ({
  pageContext: {
    logoSrc,
  },
}) => {
  return (
    <>
      <Meta
        logoSrc={ logoSrc }
        title='Page not found'
      />
      <Shell
        logoSrc={ logoSrc }
        isSearch={ false }
        isList={ false }
        withIcon={ true }
        withTitle={ true }
      >
        <PageTitle>404</PageTitle>
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
              to: '/',
              internal: true,
            } }
            className='btn-home'
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
  }),
};

export default connect(
  state => ({
    isDarkMode: state.app.isDarkMode,
    lastPageTitle: state.app.lastPageTitle,
    lastPageUrl: state.app.lastPageUrl,
    searchQuery: state.app.searchQuery,
  }),
  null
)(NotFoundPage);
