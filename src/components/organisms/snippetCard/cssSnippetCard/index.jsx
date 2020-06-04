import React from 'react';
import PropTypes from 'typedefs/proptypes';
import Anchor from 'components/atoms/anchor';
import Card from 'components/atoms/card';
import TagList from 'components/atoms/tagList';
import Expertise from 'components/atoms/expertise';
import CodeBlock from 'components/atoms/codeBlock';
import { CodepenButton } from 'components/atoms/button';
import SnippetPreview from 'components/atoms/snippetPreview';
import literals from 'lang/en/client/common';

const propTypes = {
  snippet: PropTypes.snippet,
  hasGithubLinksEnabled: PropTypes.bool,
};

/**
 * CSS snippet card.
 * Used for CSS snippets.
 * @param {bool} hasGithubLinksEnabled - Not mapped to state, has to be passed.
 */
const SnippetCard = ({
  snippet,
  hasGithubLinksEnabled = false,
}) => {
  return (
    <Card className='snippet-card' >
      <div className='card-meta'>
        <div className={ `card-icon icon icon-${snippet.icon}` }>
          <Expertise level={ snippet.expertise } />
        </div>
        <div className='card-data'>
          <h1 className='card-title'>{ snippet.title }</h1>
          <TagList tags={ [ snippet.language.long, ...snippet.tags.all ] } />
        </div>
      </div>
      { hasGithubLinksEnabled && (
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
      ) }
      <div
        className='card-description'
        dangerouslySetInnerHTML={ { __html: snippet.html.fullDescription } }
      />
      <div className='card-preview-content'>
        <SnippetPreview
          scopeId={ snippet.id.slice(snippet.id.lastIndexOf('/') + 1) }
          scopedCss={ snippet.code.scopedCss }
          htmlCode={ snippet.code.html }
          jsCode={ snippet.code.js }
        />
        <CodepenButton
          cssCode={ snippet.code.css }
          htmlCode={ snippet.code.html }
          jsCode={ snippet.code.js }
        />
      </div>
      <div className='card-source-content'>
        <CodeBlock
          language={ { short: 'html', long: 'HTML' } }
          htmlContent={ snippet.html.htmlCode }
          className='card-code'
        />
        <CodeBlock
          language={ {short: 'css', long: 'CSS'} }
          htmlContent={ snippet.html.cssCode }
          className='card-code'
        />
        { snippet.html.jsCode &&
          <CodeBlock
            language={ {short: 'js', long: 'JavaScript'} }
            htmlContent={ snippet.html.jsCode }
            className='card-code'
          />
        }
      </div>
    </Card>
  );
};

SnippetCard.propTypes = propTypes;

export default SnippetCard;
