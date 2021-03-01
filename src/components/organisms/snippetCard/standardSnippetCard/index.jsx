import React from 'react';
import PropTypes from 'typedefs/proptypes';
import Card from 'components/atoms/card';
import TagList from 'components/atoms/tagList';
import Expertise from 'components/atoms/expertise';
import CodeBlock from 'components/atoms/codeBlock';
import Actions from 'components/molecules/actions';
import literals from 'lang/en/client/common';

const propTypes = {
  snippet: PropTypes.snippet,
};

/**
 * Standard snippet card.
 * Used for simple languages (JS, Dart, Python), as well as React/JSX.
 */
const SnippetCard = ({ snippet }) => (
  <Card className='snippet-card'>
    <div className='card-meta'>
      <div className={`card-icon br-round icon icon-${snippet.icon}`}>
        <Expertise level={snippet.expertise} />
      </div>
      <div className='card-data'>
        <h1 className='card-title txt-200'>{snippet.title}</h1>
        <TagList tags={[snippet.language.long, ...snippet.tags.all]} />
      </div>
    </div>
    <div
      className='card-description'
      dangerouslySetInnerHTML={{ __html: snippet.html.fullDescription }}
    />
    <div className='card-source-content'>
      {snippet.code.style && (
        <CodeBlock
          language={snippet.language.otherLanguages[0]}
          htmlContent={snippet.html.style}
          className='card-code'
        />
      )}
      <CodeBlock
        language={snippet.language}
        htmlContent={snippet.html.code}
        className='card-code'
      />
      <h5 className='card-example-title'>{literals.examples}</h5>
      <CodeBlock
        language={snippet.language}
        htmlContent={snippet.html.example}
        className='card-example'
      />
    </div>
    <div className='card-actions'>
      <Actions snippet={snippet} />
    </div>
  </Card>
);

SnippetCard.propTypes = propTypes;

export default SnippetCard;
