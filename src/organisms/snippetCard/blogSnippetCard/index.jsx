import React from 'react';
import PropTypes from 'prop-types';
import Card from 'atoms/card';
import TagList from 'molecules/tagList';
import { Snippet as SnippetPropType } from 'typedefs';
import { trimWhiteSpace } from 'functions/utils';
import { Anchor } from 'atoms/anchor';

const SnippetCard = ({
  snippet,
  className,
  // eslint-disable-next-line no-unused-vars
  toastContainer, // Keep here to suppress React warnings and not pass to children
  ...rest
}) => (
  <Card className={ trimWhiteSpace`snippet-card ${className}` } { ...rest } >
    <h4 className='card-title'>{ snippet.title }</h4>
    <p className="card-meta-info">
      { snippet.authors.map((a, i, arr) => (
        <React.Fragment
          key={ `author-fragment-${i}` }
        >
          <Anchor
            key={ `author-anchor${i}` }
            link={ {
              internal: false,
              url: a.profile,
              rel: 'noopener noreferrer nofollow',
              target: '_blank',
            } }>
            { a.name }
          </Anchor>
          { i !== arr.length - 1 ? ', ' : '' }
        </React.Fragment>
      )) }
      { ' · ' }
      {
        new Date(snippet.firstSeen).toLocaleDateString('en-US', {
          day: 'numeric', month: 'short', year: 'numeric',
        })
      }
    </p>
    <TagList tags={ [ ...snippet.tags.all] } />
    { snippet.cover && snippet.cover.src ?
      <img
        className='card-cover-image'
        src={ snippet.cover.src }
      />
      : null }
    <div
      className='card-description'
      dangerouslySetInnerHTML={ { __html: `${snippet.html.fullDescription}` } }
    />
  </Card>
);

SnippetCard.propTypes = {
  /** Snippet data for the card */
  snippet: SnippetPropType,
  /** Additional classes for the card */
  className: PropTypes.string,
  /** Any other arguments to be passed to the card */
  rest: PropTypes.any,
  toastContainer: PropTypes.any,
};

export default SnippetCard;
