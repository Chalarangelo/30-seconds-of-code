import PropTypes from 'typedefs/proptypes';
import Link from 'next/link';
import { CardIcon, CardTitle, CardSubtitle } from 'components/atoms/card';
import literals from 'lang/en/client/common';

const propTypes = {
  contentItem: PropTypes.oneOfType([PropTypes.snippet, PropTypes.chip]),
  fromParam: PropTypes.string,
};

/**
 * General-purpose snippet/collection preview card.
 * Used in listing pages and search results.
 * Dependent on the `Card` component.
 * @param {object} contentItem - Snippet or collection object for the card.
 * @param {string} fromParam - A string to pass to the `from` param.
 */
const PreviewCard = ({ contentItem, fromParam }) => {
  const isSnippet = Boolean(contentItem.expertise);
  const tags = !isSnippet
    ? [literals.snippetCollection]
    : contentItem.language
    ? [contentItem.language, contentItem.primaryTag]
    : [
        contentItem.primaryTag,
        `${contentItem.expertise[0].toUpperCase()}${contentItem.expertise.slice(
          1
        )}`,
      ];

  return (
    <li className='card srfc-01dp txt-100 list-card grid'>
      <CardIcon
        displayExpertise={isSnippet}
        icon={contentItem.icon}
        expertise={contentItem.expertise}
      />
      <div className='card-data'>
        <CardTitle isSecondary>
          <Link
            href={
              fromParam
                ? `${contentItem.url}?from=${fromParam}`
                : contentItem.url
            }
          >
            <a className='inherit'>{contentItem.title}</a>
          </Link>
        </CardTitle>
        <CardSubtitle>{tags.join(', ')}</CardSubtitle>
      </div>
      <div
        className='card-description'
        dangerouslySetInnerHTML={{ __html: `${contentItem.description}` }}
      />
    </li>
  );
};

PreviewCard.propTypes = propTypes;

export default PreviewCard;
