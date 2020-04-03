import React from 'react';
import { connect } from 'react-redux';
import Meta from 'components/organisms/meta';
import PageTitle from 'components/atoms/pageTitle';
import Toggle from 'components/atoms/toggle/index';
import SimpleCard from 'components/molecules/simpleCard';
import Shell from 'components/organisms/shell';
import PropTypes from 'prop-types';
import { toggleDarkMode, toggleGithubLinks } from 'state/shell';

const propTypes = {
  pageContext: PropTypes.shape({
    logoSrc: PropTypes.string.isRequired,
    splashLogoSrc: PropTypes.string.isRequired,
    stringLiterals: PropTypes.shape({
      title: PropTypes.string,
      pageDescription: PropTypes.string,
      settings: PropTypes.arrayOf(PropTypes.string),
    }),
  }),
  dispatch: PropTypes.func,
  isDarkMode: PropTypes.bool,
  hasGithubLinksEnabled: PropTypes.bool,
};

/**
 * Renders a settings page
 * Used to render the /settings page.
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
}) => (
  <>
    <Meta
      title={ title }
      logoSrc={ splashLogoSrc }
      description={ pageDescription }
    />
    <Shell logoSrc={ logoSrc } isSettings >
      <PageTitle>{ title }</PageTitle>
      <SimpleCard>
        <Toggle
          checked={ !!isDarkMode }
          onChange={ () => dispatch(toggleDarkMode(!isDarkMode)) }
        >
          { settings.darkMode }
        </Toggle>
        <Toggle
          checked={ !!hasGithubLinksEnabled }
          onChange={ () => dispatch(toggleGithubLinks(!hasGithubLinksEnabled)) }
        >
          { settings.githubLinks }
        </Toggle>
      </SimpleCard>
    </Shell>
  </>
);

SettingsPage.propTypes = propTypes;

export default connect(
  state => ({
    isDarkMode: state.shell.isDarkMode,
    hasGithubLinksEnabled: state.shell.hasGithubLinksEnabled,
  }),
  null
)(SettingsPage);
