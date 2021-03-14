import React from 'react';
import PropTypes from 'typedefs/proptypes';
import Meta from 'components/organisms/meta';
import PageTitle from 'components/atoms/pageTitle';
import SimpleCard from 'components/molecules/simpleCard';
import Shell from 'components/organisms/shell';
import Toggle from 'components/atoms/toggle/index';
import { useShell } from 'state/shell';

const propTypes = {
  pageContext: PropTypes.shape({
    stringLiterals: PropTypes.shape({
      title: PropTypes.string,
      pageDescription: PropTypes.string,
      subtitle: PropTypes.string,
      cards: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string,
          html: PropTypes.string,
        })
      ),
      cookieSettingCard: PropTypes.shape({
        title: PropTypes.string,
        text: PropTypes.string,
      }),
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
      cookieSettingCard = null,
    },
  },
}) => {
  const [{ acceptsCookies }, dispatch] = useShell();
  return (
    <>
      <Meta title={title} description={pageDescription} />
      <Shell>
        <PageTitle>{title}</PageTitle>
        <p className='page-sub-title txt-100'>{subtitle}</p>
        {cards.map(({ title, html }, i) => (
          <SimpleCard
            key={i}
            title={title}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        ))}
        {cookieSettingCard ? (
          <SimpleCard title={cookieSettingCard.title}>
            <p>{cookieSettingCard.text}</p>
            <Toggle
              checked={!!acceptsCookies}
              onChange={() => {
                dispatch({
                  type: 'decideCookies',
                  acceptsCookies: !acceptsCookies,
                });
                // Force reload the page if cookies are now disabled
                if (acceptsCookies)
                  setTimeout(() => window.location.reload(), 300);
              }}
            >
              {cookieSettingCard.toggleText}
            </Toggle>
          </SimpleCard>
        ) : null}
      </Shell>
    </>
  );
};

StaticPage.propTypes = propTypes;

export default StaticPage;
