import PropTypes from 'typedefs/proptypes';
import Link from 'next/link';
import { CardIcon } from 'components/atoms/card';

const propTypes = {
  snippet: PropTypes.snippet,
};

/**
 * General-purpose snippet preview card.
 * Used in listing pages and search results.
 * Dependent on the `Card` component.
 * @param {object} snippet - Snippet object for the card.
 */
const PreviewCard = ({ snippet }) => {
  const tags = snippet.language
    ? [snippet.language, snippet.primaryTag]
    : [
        snippet.primaryTag,
        `${snippet.expertise[0].toUpperCase()}${snippet.expertise.slice(1)}`,
      ];
  return (
    <li className='card srfc-02dp txt-100 list-card grid'>
      <CardIcon icon={snippet.icon} expertise={snippet.expertise} />
      <div className='card-data'>
        <h3 className='card-title txt-200 fs-xl f-alt f-ellipsis'>
          <Link href={snippet.url}>
            <a className='inherit'>{snippet.title}</a>
          </Link>
        </h3>
        <p className='card-subtitle txt-050 fs-xs m-0'>{tags.join(', ')}</p>
      </div>
      <div
        className='card-description'
        dangerouslySetInnerHTML={{ __html: `${snippet.description}` }}
      />
    </li>
  );
};

PreviewCard.propTypes = propTypes;

export default PreviewCard;
