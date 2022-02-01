import literals from 'lang/en/client/common';
import { useState } from 'react';

/**
 * Renders a group of actions for a snippet card(copy/codepen, github).
 */
const Actions = ({ snippet }) => {
  const [active, setActive] = useState(false);

  return (
    <div className='card-actions flex'>
      {snippet.actionType === 'copy' && (
        <button
          className={`flex-none before:fs-md btn action-btn icon-btn icon ${
            active ? 'icon-check active' : 'icon-clipboard'
          }`}
          title={literals.copyToClipboard}
          onClick={() => {
            try {
              const codeBlock = document.querySelector('.card-code');
              navigator.clipboard.writeText(codeBlock.innerText);
              setTimeout(() => setActive(true), 100);
              setTimeout(() => setActive(false), 750);
            } catch (err) {
              // display error message or feedback microinteraction
            }
          }}
        />
      )}
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
  );
};

export default Actions;
