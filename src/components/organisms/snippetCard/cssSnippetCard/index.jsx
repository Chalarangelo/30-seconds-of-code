import React from 'react';
import PropTypes from 'typedefs/proptypes';
import Card from 'components/atoms/card';
import TagList from 'components/atoms/tagList';
import Expertise from 'components/atoms/expertise';
import CodeBlock from 'components/atoms/codeBlock';
import Actions from 'components/molecules/actions';
import SnippetPreview from 'components/atoms/snippetPreview';

const propTypes = {
  snippet: PropTypes.snippet,
};

/**
 * CSS snippet card.
 * Used for CSS snippets.
 */
const SnippetCard = ({ snippet }) => {
  return (
    <Card className='snippet-card'>
      <div className='card-meta'>
        <div className={`card-icon icon icon-${snippet.icon}`}>
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
      <div className='card-preview-content'>
        <SnippetPreview
          scopeId={snippet.id.slice(snippet.id.lastIndexOf('/') + 1)}
          scopedCss={snippet.code.scopedCss}
          htmlCode={snippet.code.html}
          jsCode={snippet.code.js}
        />
      </div>
      <div className='card-source-content'>
        <CodeBlock
          language={{ short: 'html', long: 'HTML' }}
          htmlContent={snippet.html.html}
          className='card-code'
        />
        <CodeBlock
          language={{ short: 'css', long: 'CSS' }}
          htmlContent={snippet.html.css}
          className='card-code'
        />
        {snippet.html.js && (
          <CodeBlock
            language={{ short: 'js', long: 'JavaScript' }}
            htmlContent={snippet.html.js}
            className='card-code'
          />
        )}
      </div>
      <div className='card-actions'>
        <Actions snippet={snippet} />
      </div>
    </Card>
  );
};

SnippetCard.propTypes = propTypes;

export default SnippetCard;
