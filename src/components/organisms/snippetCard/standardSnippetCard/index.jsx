import Card, { CardIcon, CardTitle, CardSubtitle } from 'components/atoms/card';
import Actions from 'components/molecules/actions';

/**
 * Standard snippet card.
 * Used for non-article snippets.
 */
const SnippetCard = ({ snippet }) => {
  return (
    <Card className='snippet-card'>
      <div className='card-meta grid'>
        <CardIcon icon={snippet.icon} expertise={snippet.expertise} />
        <div className='card-data'>
          <CardTitle>{snippet.title}</CardTitle>
          <CardSubtitle>
            {snippet.tags}
            {' · '}
            {snippet.date}
          </CardSubtitle>
        </div>
      </div>
      <div
        className='card-description'
        dangerouslySetInnerHTML={{ __html: snippet.fullDescription }}
      />
      <div className='card-source-content mt-5 mx-0 mb-0'>
        {snippet.codeBlocks.map(({ language, htmlContent }) => (
          <pre
            key={language.long}
            data-code-language={language.long}
            className={`notranslate ${`language-${language.short}`} card-code`}
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        ))}
      </div>
      <Actions snippet={snippet} />
    </Card>
  );
};

export default SnippetCard;
