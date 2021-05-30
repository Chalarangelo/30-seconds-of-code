import PropTypes from 'typedefs/proptypes';
import { useGtagEvent } from 'components/hooks';
import {
  CopyButton,
  CodepenButton,
  ShareButton,
} from 'components/atoms/button';
import JSX_SNIPPET_PRESETS from 'settings/jsxSnippetPresets';
import literals from 'lang/en/client/common';
import { useEffect, useState } from 'react';

const propTypes = {
  snippet: PropTypes.snippet,
};

/**
 * Renders a group of actions for a snippet card(share, copy/codepen, github).
 * Depends on the `Button` component.
 */
const Actions = ({ snippet }) => {
  const gtagCallback = useGtagEvent('click');
  const [{ src, css, html, js, style }, setCode] = useState({
    src: '',
    css: '',
    html: '',
    js: '',
    style: '',
  });

  useEffect(() => {
    if (!document) return;
    switch (snippet.actionType) {
      case 'codepen': {
        const codeBlock = document.querySelector('.card-code');
        let code = codeBlock ? codeBlock.innerText : '';
        const codeExample = document.querySelector('.card-example');
        code += codeExample ? codeExample.innerText : '';
        const styleBlock = document.querySelector(
          '.card-code[data-code-language="CSS"]'
        );
        setCode({ src: code, style: styleBlock ? styleBlock.innerText : '' });
        break;
      }
      case 'cssCodepen': {
        setCode({
          html: snippet.code.html,
          css: snippet.code.css,
          js: snippet.code.js,
        });
        break;
      }
      case 'copy': {
        const codeBlock = document.querySelector('.card-code');
        setCode({ src: codeBlock ? codeBlock.innerText : '' });
        break;
      }
      default:
        break;
    }
  }, [snippet]);

  return (
    <div className='card-actions flex'>
      <ShareButton
        pageTitle={snippet.title}
        pageDescription={snippet.description}
      />
      {Boolean(snippet.actionType === 'copy') && <CopyButton text={src} />}
      {Boolean(snippet.actionType === 'codepen') && (
        <CodepenButton
          jsCode={src}
          htmlCode={JSX_SNIPPET_PRESETS.envHtml}
          cssCode={style}
          jsPreProcessor={JSX_SNIPPET_PRESETS.jsPreProcessor}
          jsExternal={JSX_SNIPPET_PRESETS.jsImports}
        />
      )}
      {Boolean(snippet.actionType === 'cssCodepen') && (
        <CodepenButton cssCode={css} htmlCode={html} jsCode={js} />
      )}
      <a
        className='btn no-shd action-btn fs-no md:fs-sm icon icon-github '
        href={snippet.url}
        rel='nofollow noopener noreferrer'
        target='_blank'
        onClick={e => {
          e.preventDefault();
          // eslint-disable-next-line camelcase
          gtagCallback({ event_category: 'action-github', value: 1 });
          window.open(e.target.href, '_blank');
        }}
      >
        {literals.viewOnGitHub}
      </a>
    </div>
  );
};

Actions.propTypes = propTypes;

export default Actions;
