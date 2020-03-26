import React from 'react';
import PropTypes from 'prop-types';
import Card from 'components/atoms/card';
import Anchor from 'components/atoms/anchor';
import Expertise from 'components/atoms/expertise';
import { Snippet as SnippetPropType } from 'typedefs';
import { trimWhiteSpace } from 'functions/utils';
import TagList from 'components/atoms/tagList';
import literals from 'lang/en/client/common';

/**
 * General-purpose snippet preview card.
 * Used in listing pages and search results.
 * Depends on Anchor and Card atoms.
 */
const PreviewCard = ({
  snippet,
  className,
  ...rest
}) => (
  <Card className={ trimWhiteSpace`preview-card ${className}` } { ...rest } >
    <div className='card-meta'>
      <div className={ `card-icon icon icon-${snippet.icon}` }>
        <Expertise level={ snippet.expertise ? snippet.expertise : snippet.languageShort === 'blog' ? 'blog' : null } />
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
        <TagList
          tags={
            [
              snippet.language ? snippet.language : null,
              snippet.primaryTag ? snippet.primaryTag : null,
              snippet.icon === 'blog' ? literals.blog : null,
              snippet.expertise ? snippet.expertise : null,
            ]
          }
        />
      </div>
    </div>
    <div
      className='card-description'
      dangerouslySetInnerHTML={ { __html: `${snippet.description}` } }
    />
  </Card>
);

PreviewCard.propTypes = {
  /** Snippet data for the card */
  snippet: SnippetPropType,
  /** Context in which this card is rendered */
  context: PropTypes.string,
  /** Additional classes for the card */
  className: PropTypes.string,
  /** Any other arguments to be passed to the card */
  rest: PropTypes.any,
};

export default PreviewCard;
