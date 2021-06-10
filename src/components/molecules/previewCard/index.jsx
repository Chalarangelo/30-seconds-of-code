import PropTypes from 'typedefs/proptypes';
import Link from 'next/link';
import Expertise from 'components/atoms/expertise';
import TagList from 'components/atoms/tagList';

const propTypes = {
  snippet: PropTypes.snippet,
};

/**
 * General-purpose snippet preview card.
 * Used in listing pages and search results.
 * Dependent on the `Card` and `TagList` components.
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
    <li className='card srfc-02dp txt-100 list-card'>
      <div className={`card-icon br-round icon icon-${snippet.icon}`}>
        <Expertise level={snippet.expertise} />
      </div>
      <div className='card-data'>
        <h3 className='card-title txt-200 fs-xl f-alt'>
          <Link href={snippet.url}>
            <a className='inherit'>{snippet.title}</a>
          </Link>
        </h3>
        <TagList tags={tags} />
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
