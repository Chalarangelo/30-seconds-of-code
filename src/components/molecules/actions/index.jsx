import PropTypes from 'typedefs/proptypes';
import { useGtagEvent } from 'components/hooks';
import {
  CopyButton,
  CodepenButton,
  ShareButton,
} from 'components/atoms/button';
import JSX_SNIPPET_PRESETS from 'settings/jsxSnippetPresets';
import literals from 'lang/en/client/common';

const propTypes = {
  snippet: PropTypes.snippet,
};

/**
 * Renders a group of actions for a snippet card(share, copy/codepen, github).
 * Depends on the `Button` component.
 */
const Actions = ({ snippet }) => {
  const gtagCallback = useGtagEvent('click');
  const showCopy =
    snippet.code && snippet.code.src && !snippet.language.otherLanguages;
  const showCodepen =
    snippet.code && snippet.code.src && snippet.language.otherLanguages;
  const showCssCodepen =
    snippet.code && snippet.code.css && snippet.language.otherLanguages;
  return (
    <div className='card-actions flex'>
      <ShareButton
        pageTitle={snippet.title}
        pageDescription={snippet.description}
      />
      {showCopy && <CopyButton text={snippet.code.src} />}
      {showCodepen && (
        <CodepenButton
          jsCode={`${snippet.code.src}\n\n${snippet.code.example}`}
          htmlCode={JSX_SNIPPET_PRESETS.envHtml}
          cssCode={snippet.code.style}
          jsPreProcessor={JSX_SNIPPET_PRESETS.jsPreProcessor}
          jsExternal={JSX_SNIPPET_PRESETS.jsImports}
        />
      )}
      {showCssCodepen && (
        <CodepenButton
          cssCode={snippet.code.css}
          htmlCode={snippet.code.html}
          jsCode={snippet.code.js}
        />
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
