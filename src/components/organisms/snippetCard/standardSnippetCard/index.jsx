import React from 'react';
import PropTypes from 'typedefs/proptypes';
import Anchor from 'components/atoms/anchor';
import Card from 'components/atoms/card';
import TagList from 'components/atoms/tagList';
import Expertise from 'components/atoms/expertise';
import CodeBlock from 'components/atoms/codeBlock';
import { CopyButton, CodepenButton } from 'components/atoms/button';
import JSX_SNIPPET_PRESETS from 'config/jsxSnippetPresets';
import literals from 'lang/en/client/common';

const propTypes = {
  snippet: PropTypes.snippet,
  hasGithubLinksEnabled: PropTypes.bool,
};

/**
 * Standard snippet card.
 * Used for simple languages (JS, Dart, Python), as well as React/JSX.
 * @param {bool} hasGithubLinksEnabled - Not mapped to state, has to be passed.
 */
const SnippetCard = ({
  snippet,
  hasGithubLinksEnabled = false,
}) => (
  <Card className='snippet-card'>
    <div className='card-meta'>
      <div className={ `card-icon icon icon-${snippet.icon}` }>
        <Expertise level={ snippet.expertise } />
      </div>
      <div className='card-data'>
        <h4 className='card-title'>{ snippet.title }</h4>
        <TagList tags={ [ snippet.language.long, ...snippet.tags.all] }/>
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
    <div className='card-source-content'>
      {
        snippet.language.otherLanguages
          ? (
            <CodepenButton
              jsCode={ `${snippet.code.src}\n\n${snippet.code.example}` }
              htmlCode={ JSX_SNIPPET_PRESETS.envHtml }
              cssCode={ snippet.code.style }
              jsPreProcessor={ JSX_SNIPPET_PRESETS.jsPreProcessor }
              jsExternal={ JSX_SNIPPET_PRESETS.jsImports }
            />
          )
          : ( <CopyButton text={ snippet.code.src } /> )
      }
      { snippet.code.style &&
        <CodeBlock
          language={ snippet.language.otherLanguages[0] }
          htmlContent={ snippet.html.style }
          className='card-code'
        />
      }
      <CodeBlock
        language={ snippet.language }
        htmlContent={ snippet.html.code }
        className='card-code'
      />
      <h5 className='card-example-title'>{ literals.examples }</h5>
      <CodeBlock
        language={ snippet.language }
        htmlContent={ snippet.html.example }
        className='card-example'
      />
    </div>
  </Card>
);

SnippetCard.propTypes = propTypes;

export default SnippetCard;
