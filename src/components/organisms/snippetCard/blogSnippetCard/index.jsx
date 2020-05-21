import React, {Fragment} from 'react';
import PropTypes from 'typedefs/proptypes';
import Card from 'components/atoms/card';
import TagList from 'components/atoms/tagList';
import Anchor from 'components/atoms/anchor';
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
    <h4 className='card-title'>{ snippet.title }</h4>
    <div className="card-meta-info">
      { snippet.authors.map((a, i, arr) => (
        <Fragment key={ `author-fragment-${i}` } >
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
        </Fragment>
      )) }
      { ' · ' }
      {
        new Date(snippet.firstSeen).toLocaleDateString('en-US', {
          day: 'numeric', month: 'short', year: 'numeric',
        })
      }
      { ' · ' }
      <TagList tags={ [ ...snippet.tags.all ] } />
      { hasGithubLinksEnabled && (
        <>
          { ' · ' }
          <Anchor
            className='github-link'
            link={ {
              url: snippet.url,
              internal: false,
              target: '_blank',
              rel: 'nofollow noopener noreferrer',
            } }
          >
            { literals.viewOnGitHub }
          </Anchor>
        </>
      ) }
    </div>
    { snippet.cover && snippet.cover.src
      ? <img className='card-cover-image' src={ snippet.cover.src } />
      : null
    }
    <div
      className='card-description'
      dangerouslySetInnerHTML={ { __html: `${snippet.html.fullDescription}` } }
    />
  </Card>
);

SnippetCard.propTypes = propTypes;

export default SnippetCard;
