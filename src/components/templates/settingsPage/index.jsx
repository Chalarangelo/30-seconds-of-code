import React from 'react';
import { connect } from 'react-redux';
import Meta from 'components/atoms/meta';
import PageTitle from 'components/atoms/pageTitle';
import Toggle from 'components/atoms/toggle/index';
import SimpleCard from 'components/molecules/simpleCard';
import Shell from 'components/organisms/shell';
import PropTypes from 'prop-types';
import { toggleDarkMode, toggleGithubLinks } from 'state/shell';

/**
 * Renders the /settings page.
 */
const SettingsPage = ({
  pageContext: {
    logoSrc,
    splashLogoSrc,
    stringLiterals: {
      title,
      pageDescription,
      settings,
    },
  },
  dispatch,
  isDarkMode,
  hasGithubLinksEnabled,
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
        isSettings
        isListing={ false }
        withIcon
        withTitle
      >
        <PageTitle>
          { title }
        </PageTitle>
        <SimpleCard>
          <Toggle
            checked={ !!isDarkMode }
            onChange={ () => {
              dispatch(toggleDarkMode(!isDarkMode));
            } }
          >
            { settings.darkMode }
          </Toggle>
          <Toggle
            checked={ !!hasGithubLinksEnabled }
            onChange={ () => {
              dispatch(toggleGithubLinks(!hasGithubLinksEnabled));
            } }
          >
            { settings.githubLinks }
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
