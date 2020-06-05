import React, {Fragment} from 'react';
import PropTypes from 'typedefs/proptypes';
import Card from 'components/atoms/card';
import TagList from 'components/atoms/tagList';
import literals from 'lang/en/client/common';

const propTypes = {
  snippet: PropTypes.snippet,
  hasGithubLinksEnabled: PropTypes.bool,
};

/**
 * Blog snippet card.
 * Used for blog posts.
 * @param {bool} hasGithubLinksEnabled - Not mapped to state, has to be passed.
 */
const SnippetCard = ({
  snippet,
  hasGithubLinksEnabled = false,
}) => (
  <Card className='snippet-card' >
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
      { hasGithubLinksEnabled && (
        <>
          { ' · ' }
          <a
            className='github-link'
            href={ snippet.url }
            rel='nofollow noopener noreferrer'
            target='_blank'
          >
            { literals.viewOnGitHub }
          </a>
        </>
      ) }
    </div>
    { snippet.cover && snippet.cover.src &&
      <img className='card-cover-image' src={ snippet.cover.src } />
    }
    <div
      className='card-description'
      dangerouslySetInnerHTML={ { __html: snippet.html.fullDescription } }
    />
  </Card>
);

SnippetCard.propTypes = propTypes;

export default SnippetCard;
