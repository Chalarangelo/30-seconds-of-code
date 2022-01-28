import Card, { CardIcon, CardTitle, CardSubtitle } from 'components/atoms/card';
import CodeBlock from 'components/atoms/codeBlock';
import Actions from 'components/molecules/actions';

/**
 * Standard snippet card.
 * Used for simple languages (JS, Dart, Python), as well as React/JSX.
 */
const SnippetCard = ({ snippet }) => (
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
    <div className='card-source-content mt-5 mx-0 mb-0'>
      {snippet.html.style && (
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
      <CodeBlock
        language={snippet.language}
        htmlContent={snippet.html.example}
        className='card-example pt-1 px-3.5 pb-6'
      />
    </div>
    <Actions snippet={snippet} />
  </Card>
);

export default SnippetCard;
