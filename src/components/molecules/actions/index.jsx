/* eslint-disable camelcase */
import PropTypes from 'typedefs/proptypes';
import JSX_SNIPPET_PRESETS from 'settings/jsxSnippetPresets';
import literals from 'lang/en/client/common';
import { useEffect, useState } from 'react';

const propTypes = {
  snippet: PropTypes.snippet,
};

/**
 * Renders a group of actions for a snippet card(share, copy/codepen, github).
 */
const Actions = ({ snippet }) => {
  const [{ share, clipboard }, setApis] = useState({
    share: false,
    clipboard: false,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setApis({
      share: Boolean(navigator && navigator.share),
      clipboard: Boolean(navigator.clipboard && navigator.clipboard.writeText),
    });
  }, []);

  // Copy button state
  const [active, setActive] = useState(false);

  return (
    <div className='card-actions flex'>
      {share && (
        <button
          className='flex-none before:fs-md btn action-btn icon-btn icon icon-share'
          title={literals.share}
          onClick={() => {
            try {
              navigator.share({
                title: snippet.title,
                text: snippet.description,
                url: document.querySelector('link[rel=canonical]').href,
              });
            } catch (err) {
              // display error message or feedback microinteraction
            }
          }}
        />
      )}
      {snippet.actionType === 'copy' && clipboard && (
        <button
          className={`flex-none before:fs-md btn action-btn icon-btn icon ${
            active ? 'icon-check active' : 'icon-clipboard'
          }`}
          title={literals.copyToClipboard}
          onClick={() => {
            try {
              const codeBlock = document.querySelector('.card-code');
              navigator.clipboard.writeText(
                codeBlock ? codeBlock.innerText : ''
              );
              setTimeout(() => setActive(true), 100);
              setTimeout(() => setActive(false), 750);
            } catch (err) {
              // display error message or feedback microinteraction
            }
          }}
        />
      )}
      {Boolean(
        snippet.actionType === 'codepen' || snippet.actionType === 'cssCodepen'
      ) && (
        <button
          className='flex-none before:fs-md btn action-btn icon-btn icon icon-codepen'
          title={literals.codepen}
          onClick={() => {
            try {
              const isJsxCodepen = snippet.actionType === 'codepen';

              const codeBlock = document.querySelector(
                '.card-code[data-code-language="React"]'
              );
              const codeExample = document.querySelector('.card-example');
              const styleBlock = document.querySelector(
                '.card-code[data-code-language="CSS"]'
              );

              let code = codeBlock ? codeBlock.innerText : '';
              code += codeExample ? codeExample.innerText : '';

              const snippetData = JSON.stringify(
                isJsxCodepen
                  ? {
                      js: code,
                      css: styleBlock ? styleBlock.innerText : '',
                      html: JSX_SNIPPET_PRESETS.envHtml,
                      js_pre_processor: JSX_SNIPPET_PRESETS.jsPreProcessor,
                      js_external: JSX_SNIPPET_PRESETS.jsImports.join(';'),
                    }
                  : {
                      html: snippet.code.html,
                      css: snippet.code.css,
                      js: snippet.code.js,
                      js_pre_processor: 'none',
                      js_external: '',
                    }
              );

              const form = document.createElement('form');
              form.setAttribute('action', 'https://codepen.io/pen/define');
              form.setAttribute('method', 'POST');
              form.setAttribute('target', '_blank');

              const input = document.createElement('input');
              input.setAttribute('type', 'hidden');
              input.setAttribute('name', 'data');
              input.setAttribute('value', snippetData);

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
        onClick={e => {
          e.preventDefault();
          window.open(e.target.href, '_blank');
        }}
      />
    </div>
  );
};

Actions.propTypes = propTypes;

export default Actions;
