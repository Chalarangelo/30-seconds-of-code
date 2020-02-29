import React from 'react';
import PropTypes from 'prop-types';
import Card from 'atoms/card';
import Anchor from 'atoms/anchor';
import Expertise from 'atoms/expertise';
import { Snippet as SnippetPropType } from 'typedefs';
import { trimWhiteSpace } from 'functions/utils';
import TagList from 'atoms/tagList';
import _ from 'lang';
const _l = _('en');

/**
 * General-purpose snippet preview card.
 * Used in listing pages and search results.
 * Depends on Anchor and Card atoms.
 */
const PreviewCard = ({
  snippet,
  context,
  className,
  ...rest
}) => (
  <Anchor
    link={ {
      internal: true,
      url: snippet.url,
    } }
    className='preview-card-wrapper'
  >
    <Card className={ trimWhiteSpace`preview-card ${className}` } { ...rest } >
      <div className='card-meta'>
        <div className={ `card-icon icon icon-${snippet.languageShort}` }>
          <Expertise level={ snippet.expertise ? snippet.expertise : snippet.languageShort === 'blog' ? 'blog' : null } />
        </div>
        <div className='card-data'>
          <h4 className='card-title'>{ snippet.title }</h4>
          <TagList
            tags={
              [
                snippet.language ? snippet.language : null,
                snippet.primaryTag ? snippet.primaryTag : null,
                snippet.languageShort === 'blog' ? _l('Blog') : null,
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
  </Anchor>
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
