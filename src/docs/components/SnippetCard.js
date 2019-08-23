import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import config from '../../../config';

import { getTextualContent, getCodeBlocks, optimizeAllNodes, getExplanation, getBrowserSupport } from '../util';
// import ShareIcon from './SVGs/ShareIcon';
import AniLink from 'gatsby-plugin-transition-link/AniLink';
import CollapseOpenIcon from './SVGs/CollapseOpenIcon';
import CollapseClosedIcon from './SVGs/CollapseClosedIcon';
import ReactCSSTransitionReplace from 'react-css-transition-replace';

// ===================================================
// Snippet Card HOC - check components below for more
// ===================================================
const SnippetCard = ({ short, snippetData, ...rest }) => 
  short ? (
    <ShortCard snippetData={snippetData} {...rest} />
  ) : (
    <FullCard snippetData={snippetData} {...rest} />
  );

// ===================================================
// Link to edit snippet on Codepen
// ===================================================
const CodepenButton = ({ snippetData }) => (
  <form action='https://codepen.io/pen/define' method='POST' target='_blank'>
    <input 
      type='hidden'
      name='data'
      value={
        JSON.stringify({
          css: snippetData.code.css,
          html: snippetData.code.html,
          js: snippetData.code.js
        })
      }
    />
    <button className='button button-a button-codepen'>Edit on Codepen</button>
  </form>
)

// ===================================================
// Full snippet view (tags, code, title, description)
// ===================================================
const FullCard = ({ snippetData, isDarkMode }) => {
  console.log(snippetData);
  const tags = snippetData.tags;
  let cardCodeHtml = `${optimizeAllNodes(
    getCodeBlocks(snippetData.html).html,
  )}`;
  let cardCodeCss = `${optimizeAllNodes(
    getCodeBlocks(snippetData.html).css,
  )}`;
  let cardCodeJs = `${optimizeAllNodes(
    getCodeBlocks(snippetData.html).js,
  )}`;
  return (
    <div className='card'>
      <h4 className='card-title'>
        {snippetData.title}&nbsp;&nbsp;
        {tags.map(tag => (
          <span className={`tag tag-${tag}`} key={`tag_${tag}`}>{tag}</span>
        ))}
      </h4>
      
      <div
        className='card-description'
        dangerouslySetInnerHTML={{
          __html: `${getTextualContent(snippetData.html)}`,
        }}
      />
      <div className='card-bottom'>
        <h5 className='card-section-title card-section-html'>HTML</h5>
        <pre
          className={`card-code language-${config.secondLanguage}`}
          dangerouslySetInnerHTML={{ __html: cardCodeHtml }}
        />
        <h5 className='card-section-title card-section-css'>CSS</h5>
        <pre
          className={`card-code language-${config.language}`}
          dangerouslySetInnerHTML={{ __html: cardCodeCss }}
        />
        {
          cardCodeJs && <>
            <h5 className='card-section-title card-section-js'>JavaScript</h5>
            <pre
              className={`card-code language-${config.optionalLanguage}`}
              dangerouslySetInnerHTML={{ __html: cardCodeJs }}
            />
          </>
        }
        <h5 className='card-section-demo-title'>Demo</h5>
        <div className='card-snippet-demo' data-scope={snippetData.id}>
          <style>
            {snippetData.code.scopedCss}
          </style>
          <div dangerouslySetInnerHTML={{__html: snippetData.code.html}} />
          {
            cardCodeJs &&
            <script>
              {`function()(${snippetData.code.js})();`}
            </script>
          }
        </div>
        <CodepenButton snippetData={snippetData}/>
        <h5 className='card-section-explanation-title'>Explanation</h5>
        <div
          className='card-explanation'
          dangerouslySetInnerHTML={{
            __html: `${getExplanation(snippetData.html)}`,
          }}
        />
        <h5 className='card-section-browser-support-title'>Browser support</h5>
        <p className='browser-support-data'>{snippetData.supportPercentage}%</p>
        <div
          className='card-browser-support'
          dangerouslySetInnerHTML={{
            __html: `${getBrowserSupport(snippetData.html)}`,
          }}
        />
      </div>
    </div>
  );
};

// ===================================================
// Short snippet view (title, description, code*)
// ===================================================
const ShortCard = ({
  snippetData,
  withCode = false,
  isDarkMode
}) => {
  let cardCodeHtml;
  if (withCode)
    cardCodeHtml = `${optimizeAllNodes(
      getCodeBlocks(snippetData.html).code,
    )}`;
  return (
    <div className='card short'>
      <h4 className='card-title'>
        <AniLink
          paintDrip
          to={`/snippet/${snippetData.id}`}
          hex={isDarkMode ? '#434E76' : '#FFFFFF'}
        >
          {snippetData.title}
        </AniLink>
      </h4>
      <div
        className='card-description'
        dangerouslySetInnerHTML={{
          __html: `${getTextualContent(snippetData.html)}`,
        }}
      />
      {withCode ? <div className='card-bottom'>
        <CopyToClipboard
          text={snippetData.code}
          onCopy={() => {
            let tst = document.createElement('div');
            tst.classList = 'toast';
            tst.innerHTML = 'Snippet copied to clipboard!';
            document.body.appendChild(tst);
            setTimeout(function() {
              tst.style.opacity = 0;
              setTimeout(function() {
                document.body.removeChild(tst);
              }, 300);
            }, 1700);
          }}
        >
          <button
            className='button button-a button-copy'
            aria-label='Copy to clipboard'
          />
        </CopyToClipboard>
        <pre
          className={`card-code language-${config.language}`}
          dangerouslySetInnerHTML={{ __html: cardCodeHtml }}
        />
      </div> : '' }
    </div>
  );
};

export default SnippetCard;
