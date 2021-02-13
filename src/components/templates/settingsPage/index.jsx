import React from 'react';
import PropTypes from 'typedefs/proptypes';
import { connect } from 'react-redux';
import Meta from 'components/organisms/meta';
import PageTitle from 'components/atoms/pageTitle';
import Toggle from 'components/atoms/toggle/index';
import SimpleCard from 'components/molecules/simpleCard';
import Shell from 'components/organisms/shell';
import { toggleDarkMode, decideCookies } from 'state/shell';

const propTypes = {
  pageContext: PropTypes.shape({
    stringLiterals: PropTypes.shape({
      title: PropTypes.string,
      pageDescription: PropTypes.string,
      settings: PropTypes.shape({
        darkMode: PropTypes.string,
        githubLinks: PropTypes.string,
        cookies: PropTypes.string,
      }),
    }),
  }),
  dispatch: PropTypes.func,
  isDarkMode: PropTypes.bool,
  acceptsCookies: PropTypes.bool,
};

/**
 * Renders a settings page
 * Used to render the /settings page.
 */
const SettingsPage = ({
  pageContext: {
    stringLiterals: { title, pageDescription, settings },
  },
  dispatch,
  isDarkMode,
  acceptsCookies,
}) => (
  <>
    <Meta title={title} description={pageDescription} />
    <Shell isSettings>
      <PageTitle>{title}</PageTitle>
      <SimpleCard>
        <Toggle
          checked={!!isDarkMode}
          onChange={() => dispatch(toggleDarkMode(!isDarkMode))}
        >
          {settings.darkMode}
        </Toggle>
        <Toggle
          checked={!!acceptsCookies}
          onChange={() => dispatch(decideCookies(!acceptsCookies))}
        >
          {settings.cookies}
        </Toggle>
      </SimpleCard>
    </Shell>
  </>
);

SettingsPage.propTypes = propTypes;

export default connect(
  state => ({
    isDarkMode: state.shell.isDarkMode,
    acceptsCookies: state.shell.acceptsCookies,
  }),
  null
)(SettingsPage);
