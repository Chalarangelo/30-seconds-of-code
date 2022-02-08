import { useEffect, Fragment } from 'react';
import Image from 'components/atoms/image';
import Card, { CardIcon, CardTitle, CardSubtitle } from 'components/atoms/card';
import Actions from 'components/molecules/actions';
import literals from 'lang/en/client/common';

/**
 * Standard snippet card.
 * Used for non-article snippets.
 */
const SnippetCard = ({ snippet }) => {
  useEffect(() => {
    // The third condition is a hack to only apply this for CSS snippets and
    // not React ones which have a `js` key, too.
    if (!snippet.code || !snippet.code.js || !snippet.code.scopedCss) return;
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

  const hasAuthors = Boolean(snippet.authors && snippet.authors.length);
  const hasCodeBlocks = Boolean(
    snippet.codeBlocks && snippet.codeBlocks.length
  );
  const hasScopeCSS = Boolean(snippet.code && snippet.code.scopedCss);

  return (
    <Card className='snippet-card'>
      <div className='card-meta grid'>
        <CardIcon icon={snippet.icon} expertise={snippet.expertise} />
        <div className='card-data'>
          <CardTitle>{snippet.title}</CardTitle>
          <CardSubtitle>
            {hasAuthors &&
              snippet.authors.map((a, i, arr) => (
                <Fragment key={`author-fragment-${i}`}>
                  <a
                    className='inherit'
                    href={a.profile}
                    rel='nofollow noopener noreferrer'
                    target='_blank'
                  >
                    {a.name}
                  </a>
                  {i !== arr.length - 1 ? ', ' : ''}
                </Fragment>
              ))}
            {hasAuthors && ' · '}
            {snippet.tags}
            {' · '}
            <span className='inline-block'>{snippet.date}</span>
          </CardSubtitle>
        </div>
      </div>
      {snippet.cover && (
        <Image
          className='card-cover-image card-fw-section'
          src={snippet.cover}
          alt=''
          height='232'
          width='348'
        />
      )}
      <div
        className='card-description flex flex-col'
        dangerouslySetInnerHTML={{ __html: snippet.fullDescription }}
      />
      {hasScopeCSS && (
        <div className='card-preview-content'>
          <h5 className='snippet-preview-title txt-150 fs-md'>
            {literals.preview}
          </h5>
          <div
            className='snippet-preview m-0 br-lg'
            data-scope='snippet-preview'
          >
            <style>{snippet.code.scopedCss}</style>
            <div dangerouslySetInnerHTML={{ __html: snippet.code.html }} />
          </div>
        </div>
      )}
      {hasCodeBlocks && (
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
      )}
      <Actions snippet={snippet} />
    </Card>
  );
};

export default SnippetCard;
