import React from 'react';
import PropTypes from 'typedefs/proptypes';
import Card from 'components/atoms/card';
import Anchor from 'components/atoms/anchor';
import Expertise from 'components/atoms/expertise';
import { combineClassNames } from 'utils';
import TagList from 'components/atoms/tagList';
import literals from 'lang/en/client/common';

const propTypes = {
  snippet: PropTypes.snippet,
  className: PropTypes.string,
  rest: PropTypes.any,
};

/**
 * General-purpose snippet preview card.
 * Used in listing pages and search results.
 * Dependent on the `Anchor`, `Card` and `TagList` components.
 * @param {object} snippet - Snippet object for the card.
 */
const PreviewCard = ({
  snippet,
  className,
  ...rest
}) => {
  const tags = [snippet.primaryTag, snippet.expertise];
  if (snippet.language) tags.unshift(snippet.language);
  return(
    <Card className={ combineClassNames`preview-card ${className}` } { ...rest } >
      <div className='card-meta'>
        <div className={ `card-icon icon icon-${snippet.icon}` }>
          <Expertise level={ snippet.expertise } />
        </div>
        <div className='card-data'>
          <h4 className='card-title'>
            <Anchor
              link={ {
                internal: true,
                url: snippet.url,
              } }
              className='preview-card-wrapper'
            >
              { snippet.title }
            </Anchor>
          </h4>
          <TagList tags={ tags } />
        </div>
      </div>
      <div
        className='card-description'
        dangerouslySetInnerHTML={ { __html: `${snippet.description}` } }
      />
    </Card>
  );
};

PreviewCard.propTypes = propTypes;

export default PreviewCard;
