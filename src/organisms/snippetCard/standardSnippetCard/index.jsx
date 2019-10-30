import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Card from 'atoms/card';
import TagList from 'molecules/tagList';
import Expertise from 'atoms/expertise';
import CodeBlock from 'atoms/codeBlock';
import { CopyButton, CodepenButton } from 'atoms/button';
import Toast from 'atoms/toast';
import { Snippet as SnippetPropType } from 'typedefs';
import { trimWhiteSpace } from 'functions/utils';
import { JSX_SNIPPET_PRESETS } from 'shared';
import _ from 'lang';
const _l = _('en');

const SnippetCard = ({
  snippet,
  className,
  toastContainer,
  ...rest
}) => (
  <Card className={ trimWhiteSpace`snippet-card ${className}` } { ...rest } >
    <h4 className='card-title'>{ snippet.title }</h4>
    <Expertise level={ snippet.expertise } />
    <TagList tags={ [snippet.language.long, ...snippet.tags.all] } />
    <div
      className='card-description'
      dangerouslySetInnerHTML={ { __html: `${snippet.html.fullDescription}` } }
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
          : (
            <CopyButton
              text={ snippet.code.src }
              onCopy={ () => {
                const _toastContainer = document.getElementById(toastContainer);
                ReactDOM.render(
                  <Toast message='Snippet copied to clipboard!'/>,
                  _toastContainer
                );
                setTimeout(() => {
                  ReactDOM.unmountComponentAtNode(_toastContainer);
                }, 2000);
              } }
            />
          )
      }
      {
        snippet.code.style ? (
          <CodeBlock
            language={ snippet.language.otherLanguages[0] }
            htmlContent={ snippet.html.style }
            className='card-code'
          />
        ) : null
      }
      <CodeBlock
        language={ snippet.language }
        htmlContent={ snippet.html.code }
        className='card-code'
      />
      <h5 className='card-example-title'>{ _l('Examples') }</h5>
      <CodeBlock
        language={ snippet.language }
        htmlContent={ snippet.html.example }
        className='card-example'
      />
    </div>
  </Card>
);

SnippetCard.propTypes = {
  /** Snippet data for the card */
  snippet: SnippetPropType,
  /** Additional classes for the card */
  className: PropTypes.string,
  /** The id of a DOM node used to render the toast when copying the snippet */
  toastContainer: PropTypes.node,
  /** Any other arguments to be passed to the card */
  rest: PropTypes.any,
};

export default SnippetCard;
