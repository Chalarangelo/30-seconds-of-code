/* eslint-disable camelcase */
import PropTypes from 'typedefs/proptypes';
import { useGtagEvent } from 'components/hooks';
import copyToClipboard from 'copy-to-clipboard';
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
  const gtagCallback = useGtagEvent('click');

  // Code state
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
        const codeBlock = document.querySelector(
          '.card-code[data-code-language="React"]'
        );
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

  // Share state
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    if (navigator && navigator.share) setCanShare(true);
  }, []);

  // Copy button state
  const [active, setActive] = useState(false);
  const [copying, setCopying] = useState(false);

  // If `copying` is `true`, then play the activation animation.
  useEffect(() => {
    if (!copying) return;
    copyToClipboard(src);
    setTimeout(() => setActive(true), 100);
    setTimeout(() => setActive(false), 750);
  }, [copying]);

  // If `active` is `false`, set `copying` to false (finished activation animation).
  useEffect(() => {
    if (active) return;
    setCopying(false);
  }, [active]);

  const isJsxCodepen = snippet.actionType === 'codepen';

  return (
    <div className='card-actions flex'>
      {Boolean(canShare) && (
        <button
          className='flex-none btn action-btn icon icon-share'
          title={literals.share}
          onClick={() => {
            gtagCallback({ event_category: 'action-share', value: 1 });
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
      {Boolean(snippet.actionType === 'copy') && (
        <button
          className={`flex-none btn action-btn icon ${
            active ? 'icon-check active' : 'icon-clipboard'
          }`}
          title={literals.copyToClipboard}
          onClick={() => {
            gtagCallback({ event_category: 'action-copy', value: 1 });
            setCopying(true);
          }}
        />
      )}
      {Boolean(
        snippet.actionType === 'codepen' || snippet.actionType === 'cssCodepen'
      ) && (
        <form
          action='https://codepen.io/pen/define'
          method='POST'
          target='_blank'
          className='flex-none'
        >
          <input
            type='hidden'
            name='data'
            value={JSON.stringify({
              js: isJsxCodepen ? src : js,
              css: isJsxCodepen ? style : css,
              html: isJsxCodepen ? JSX_SNIPPET_PRESETS.envHtml : html,
              js_pre_processor: isJsxCodepen
                ? JSX_SNIPPET_PRESETS.jsPreProcessor
                : 'none',
              js_external: isJsxCodepen
                ? JSX_SNIPPET_PRESETS.jsImports.join(';')
                : '',
            })}
          />
          <button
            className='flex-none btn action-btn icon icon-codepen'
            title={literals.codepen}
            onClick={() => {
              gtagCallback({ event_category: 'action-codepen', value: 1 });
            }}
          />
        </form>
      )}
      <a
        className='flex-none btn action-btn icon icon-github '
        href={snippet.url}
        rel='nofollow noopener noreferrer'
        target='_blank'
        title={literals.viewOnGitHub}
        onClick={e => {
          e.preventDefault();
          gtagCallback({ event_category: 'action-github', value: 1 });
          window.open(e.target.href, '_blank');
        }}
      />
    </div>
  );
};

Actions.propTypes = propTypes;

export default Actions;
