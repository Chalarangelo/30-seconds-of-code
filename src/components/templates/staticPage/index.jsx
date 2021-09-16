import PropTypes from 'typedefs/proptypes';
import Meta from 'components/organisms/meta';
import PageTitle from 'components/atoms/pageTitle';
import Card, { CardTitle } from 'components/atoms/card';
import Shell from 'components/organisms/shell';
import { useShell } from 'state/shell';

const propTypes = {
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
};

/**
 * Renders a static page from the given data.
 * Responsible for rendering the /about and /cookies pages.
 * @param {object} stringLiterals - An object with all the necessary information
 *   for rendering this page. The `cards` array will hold title+html pairs for
 *   each `Card` rendered.
 */
const StaticPage = ({
  stringLiterals: {
    title,
    subtitle,
    pageDescription,
    cards,
    cookieSettingCard = null,
  },
}) => {
  const [{ acceptsCookies }, dispatch] = useShell();
  return (
    <>
      <Meta title={title} description={pageDescription} />
      <Shell>
        <PageTitle>{title}</PageTitle>
        <p className='my-0 mx-3.5 txt-100'>{subtitle}</p>
        {cards.map(({ title, html }, i) => (
          <Card key={i}>
            <CardTitle isSecondary>{title}</CardTitle>
            <div
              className='card-description'
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </Card>
        ))}
        {cookieSettingCard ? (
          <Card>
            <CardTitle isSecondary>{cookieSettingCard.title}</CardTitle>
            <div className='card-description'>
              <p>{cookieSettingCard.text}</p>
              <label className='flex a-center md:fs-md'>
                <input
                  className='mr-2'
                  defaultChecked={!!acceptsCookies}
                  type='checkbox'
                  onChange={() => {
                    dispatch({
                      type: 'decideCookies',
                      acceptsCookies: !acceptsCookies,
                    });
                    // Force reload the page if cookies are now disabled
                    if (acceptsCookies)
                      setTimeout(() => window.location.reload(), 300);
                  }}
                />
                {cookieSettingCard.toggleText}
              </label>
            </div>
          </Card>
        ) : null}
      </Shell>
    </>
  );
};

StaticPage.propTypes = propTypes;

export default StaticPage;
