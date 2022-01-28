import { useEffect } from 'react';
import Card, { CardIcon, CardTitle, CardSubtitle } from 'components/atoms/card';
import CodeBlock from 'components/atoms/codeBlock';
import Actions from 'components/molecules/actions';
import literals from 'lang/en/client/common';

/**
 * CSS snippet card.
 * Used for CSS snippets.
 */
const SnippetCard = ({ snippet }) => {
  useEffect(() => {
    if (!snippet.code.js) return;
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.innerHTML = `function snippet_preview_js(){${snippet.code.js}};`;
    document.body.appendChild(s);
    try {
      window['snippet_preview_js']();
    } catch (e) {
      /* istanbul ignore next */
      console.warn(
        'There is an issue with JavaScript execution on the snippet preview of this page.'
      );
    }
  }, []);

  return (
    <Card className='snippet-card'>
      <div className='card-meta grid'>
        <CardIcon icon={snippet.icon} expertise={snippet.expertise} />
        <div className='card-data'>
          <CardTitle>{snippet.title}</CardTitle>
          <CardSubtitle>
            {[snippet.language.long, ...snippet.tags.all].join(', ')}
          </CardSubtitle>
        </div>
      </div>
      <div
        className='card-description'
        dangerouslySetInnerHTML={{ __html: snippet.html.fullDescription }}
      />
      <div className='card-preview-content'>
        <h5 className='snippet-preview-title txt-150 fs-md'>
          {literals.preview}
        </h5>
        <div
          className='snippet-preview m-0 br-lg'
          data-scope={snippet.id.slice(snippet.id.lastIndexOf('/') + 1)}
        >
          <style>{snippet.code.scopedCss}</style>
          <div dangerouslySetInnerHTML={{ __html: snippet.code.html }} />
        </div>
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
      <Actions snippet={snippet} />
    </Card>
  );
};

export default SnippetCard;
