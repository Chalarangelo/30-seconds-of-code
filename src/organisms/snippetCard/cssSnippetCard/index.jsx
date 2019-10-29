import React from 'react';
import PropTypes from 'prop-types';
import Card from 'atoms/card';
import TagList from 'molecules/tagList';
import Expertise from 'atoms/expertise';
import CodeBlock from 'atoms/codeBlock';
import {CodepenButton} from 'atoms/button';
import SnippetPreview from 'atoms/snippetPreview';
import BrowserSupport from 'atoms/browserSupport';
import { Snippet as SnippetPropType } from 'typedefs';
import { trimWhiteSpace } from 'functions/utils';
import _ from 'lang';
const _l = _('en');

const SnippetCard = ({
  snippet,
  className,
  ...rest
}) => {
  return (
    <Card className={ trimWhiteSpace`snippet-card ${className}` } { ...rest } >
      <h4 className='card-title'>{ snippet.title }</h4>
      <Expertise level={ snippet.expertise } />
      <TagList tags={ [snippet.language.long, ...snippet.tags.all] } />
      <div
        className='card-description'
        dangerouslySetInnerHTML={ { __html: `${snippet.html.fullDescription}` } }
      />
      <BrowserSupport
        supportPercentage={ snippet.browserSupport.supportPercentage }
        browserSupportHtml={ snippet.html.browserSupport }
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
        { snippet.html.jsCode ? <CodeBlock
          language={ {short: 'js', long: 'JavaScript'} }
          htmlContent={ snippet.html.jsCode }
          className='card-code'
        /> : null }
      </div>
    </Card>
  );
};

SnippetCard.propTypes = {
  /** Snippet data for the card */
  snippet: SnippetPropType,
  /** Additional classes for the card */
  className: PropTypes.string,
  /** Any other arguments to be passed to the card */
  rest: PropTypes.any,
};

export default SnippetCard;
