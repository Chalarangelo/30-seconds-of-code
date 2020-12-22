import React from 'react';
import PropTypes from 'typedefs/proptypes';
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
    : [snippet.primaryTag, snippet.expertise];
  return (
    <li className='card preview-card'>
      <div className={`card-icon icon icon-${snippet.icon}`}>
        <Expertise level={snippet.expertise} />
      </div>
      <div className='card-data'>
        <h4 className='card-title'>
          <a href={snippet.url}>{snippet.title}</a>
        </h4>
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
