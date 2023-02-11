import { useEffect } from 'react';
import Image from 'components/atoms/image';
import Card, { CardTitle, CardSubtitle } from 'components/atoms/card';
import literals from 'lang/en/client/snippet';

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

  const hasCodeBlocks = Boolean(
    snippet.codeBlocks && snippet.codeBlocks.length
  );
  const hasScopeCSS = Boolean(snippet.code && snippet.code.scopedCss);

  return (
    <Card className='snippet-card g-c2'>
      <CardTitle>{snippet.title}</CardTitle>
      <CardSubtitle>
        {snippet.tags}
        {' · '}
        <span className='inline-block'>{snippet.date}</span>
      </CardSubtitle>
      <Image
        className='ar-wide mt-5 card-fw-section'
        src={snippet.cover}
        alt=''
        height='180'
        width='360'
        fetchpriority='high'
      />
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
            className='snippet-preview m-0 br-md'
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
            <div className='code-highlight' key={language.long}>
              <pre
                data-code-language={language.long}
                className={`notranslate ${`language-${language.short}`} card-code`}
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />
              {language.long !== 'Examples' && (
                <button
                  className='flex-none before:fs-sm btn action-btn icon-btn icon icon-clipboard'
                  title={`${literals.copyToClipboard}`}
                />
              )}
            </div>
          ))}
        </div>
      )}
      {snippet.author ? (
        <div className='card-author flex flex-col'>
          <h3 className='mt-4 mb-0 mx-0 txt-150 fs-md md:fs-lg'>
            {literals.writtenBy(snippet.author.name)}
          </h3>
          <p className='mx-0 mt-2 mb-0 txt-100'>{snippet.author.intro}</p>
          <p className='m-0 txt-100'>
            {'If you want to keep in touch, follow me on '}
            <a
              href={snippet.author.github}
              target='_blank'
              rel='nofollow noopener noreferrer'
            >
              {literals.github}
            </a>
            {' or '}
            <a
              href={snippet.author.twitter}
              target='_blank'
              rel='nofollow noopener noreferrer'
            >
              {literals.twitter}
            </a>
            {'.'}
          </p>
        </div>
      ) : null}
      <div className='card-actions flex'>
        {snippet.actionType === 'codepen' && (
          <button
            className='flex-none before:fs-md btn action-btn icon-btn icon icon-codepen'
            title={literals.codepen}
            onClick={() => {
              try {
                const form = document.createElement('form');
                form.setAttribute('action', 'https://codepen.io/pen/define');
                form.setAttribute('method', 'POST');
                form.setAttribute('target', '_blank');

                const input = document.createElement('input');
                input.setAttribute('type', 'hidden');
                input.setAttribute('name', 'data');
                input.setAttribute('value', JSON.stringify(snippet.code));

                form.appendChild(input);
                document.body.appendChild(form);
                form.submit();
                document.body.removeChild(form);
              } catch (err) {
                // display error message or feedback microinteraction
              }
            }}
          />
        )}
        <a
          className='flex-none before:fs-md btn action-btn icon-btn icon icon-github'
          href={snippet.url}
          rel='nofollow noopener noreferrer'
          target='_blank'
          title={literals.viewOnGitHub}
        />
      </div>
    </Card>
  );
};

export default SnippetCard;
