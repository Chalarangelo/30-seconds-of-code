import React, {Fragment} from 'react';
import PropTypes from 'typedefs/proptypes';
import Card from 'components/atoms/card';
import TagList from 'components/atoms/tagList';
import Actions from 'components/molecules/actions';

const propTypes = {
  snippet: PropTypes.snippet,
};

/**
 * Blog snippet card.
 * Used for blog posts.
 */
const SnippetCard = ({
  snippet,
}) => (
  <Card className='snippet-card blog-card'>
    <h1 className='card-title'>{ snippet.title }</h1>
    <div className="card-meta-info">
      { snippet.authors.map((a, i, arr) => (
        <Fragment key={ `author-fragment-${i}` } >
          <a
            href={ a.profile }
            rel='nofollow noopener noreferrer'
            target='_blank'
          >
            { a.name }
          </a>
          { i !== arr.length - 1 ? ', ' : '' }
        </Fragment>
      )) }
      { ' · ' }
      { new Date(snippet.firstSeen).toLocaleDateString('en-US', {
        day: 'numeric', month: 'short', year: 'numeric',
      }) }
      { ' · ' }
      <TagList tags={ snippet.tags.all } />
    </div>
    { snippet.cover && snippet.cover &&
      <img className='card-cover-image' src={ snippet.cover } />
    }
    <div
      className='card-description'
      dangerouslySetInnerHTML={ { __html: snippet.html.fullDescription } }
    />
    <div className='card-actions'>
      <Actions
        snippet={ snippet }
      />
    </div>
  </Card>
);

SnippetCard.propTypes = propTypes;

export default SnippetCard;
