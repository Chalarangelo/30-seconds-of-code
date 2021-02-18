import React from 'react';
import PropTypes from 'typedefs/proptypes';
import Meta from 'components/organisms/meta';
import PageTitle from 'components/atoms/pageTitle';
import Toggle from 'components/atoms/toggle/index';
import SimpleCard from 'components/molecules/simpleCard';
import Shell from 'components/organisms/shell';
import { useShell } from 'state/shell';

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
};

/**
 * Renders a settings page
 * Used to render the /settings page.
 */
const SettingsPage = ({
  pageContext: {
    stringLiterals: { title, pageDescription, settings },
  },
}) => {
  const [{ isDarkMode, acceptsCookies }, dispatch] = useShell();
  return (
    <>
      <Meta title={title} description={pageDescription} />
      <Shell isSettings>
        <PageTitle>{title}</PageTitle>
        <SimpleCard>
          <Toggle
            checked={!!isDarkMode}
            onChange={() =>
              dispatch({ type: 'toggleDarkMode', isDarkMode: !isDarkMode })
            }
          >
            {settings.darkMode}
          </Toggle>
          <Toggle
            checked={!!acceptsCookies}
            onChange={() =>
              dispatch({
                type: 'decideCookies',
                acceptsCookies: !acceptsCookies,
              })
            }
          >
            {settings.cookies}
          </Toggle>
        </SimpleCard>
      </Shell>
    </>
  );
};

SettingsPage.propTypes = propTypes;

export default SettingsPage;
