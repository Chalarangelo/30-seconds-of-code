import React from 'react';
import { connect } from 'react-redux';
import Meta from 'atoms/meta';
import Shell from 'organisms/shell';
import SimpleCard from 'molecules/simpleCard';
import PageTitle from 'atoms/pageTitle';
import PropTypes from 'prop-types';
import Toggle from 'atoms/toggle/index';
import { toggleDarkMode, toggleGithubLinks } from 'state/shell';
import _ from 'lang';
const _l = _('en');

// Used to produce a description
const templateData = {
  pageType: 'settings',
};

/**
 * Renders the /about page.
 */
const SettingsPage = ({
  pageContext: {
    logoSrc,
    splashLogoSrc,
  },
  dispatch,
  isDarkMode,
  hasGithubLinksEnabled,
}) => {
  return (
    <>
      <Meta
        title={ _l('Settings') }
        logoSrc={ splashLogoSrc }
        description={ _l`site.pageDescription${templateData}` }
      />
      <Shell
        logoSrc={ logoSrc }
        isSearch={ false }
        isSettings
        isListing={ false }
        withIcon
        withTitle
      >
        <PageTitle>
          { _l('Settings') }
        </PageTitle>
        <SimpleCard>
          <Toggle
            checked={ !!isDarkMode }
            onChange={ () => {
              dispatch(toggleDarkMode(!isDarkMode));
            } }
          >
            { _l('settings.dark_mode') }
          </Toggle>
          <Toggle
            checked={ !!hasGithubLinksEnabled }
            onChange={ () => {
              dispatch(toggleGithubLinks(!hasGithubLinksEnabled));
            } }
          >
            { _l('settings.github_links') }
          </Toggle>
        </SimpleCard>

      </Shell>
    </>
  );
};

SettingsPage.propTypes = {
  /** pageContext is passed from Gatsby to the page */
  pageContext: PropTypes.shape({
    /** URI for the logo image */
    logoSrc: PropTypes.string.isRequired,
    /** URI for the splash logo image */
    splashLogoSrc: PropTypes.string.isRequired,
  }),
  /** Dispatch function of the Redux stotre */
  dispatch: PropTypes.func,
  /** Should dark mode be applied? */
  isDarkMode: PropTypes.bool,
  /** Are GitHub links enabled? */
  hasGithubLinksEnabled: PropTypes.bool,
};

export default connect(
  state => ({
    isDarkMode: state.shell.isDarkMode,
    hasGithubLinksEnabled: state.shell.hasGithubLinksEnabled,
  }),
  null
)(SettingsPage);
