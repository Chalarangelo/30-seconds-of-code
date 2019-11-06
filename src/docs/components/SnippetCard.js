import React from 'react';
import { Link } from 'gatsby';
import config from '../../../config';

import { getTextualContent, getCodeBlocks, optimizeAllNodes, getExplanation, getBrowserSupport } from '../util';
// import ShareIcon from './SVGs/ShareIcon';
import CollapseOpenIcon from './SVGs/CollapseOpenIcon';
import CollapseClosedIcon from './SVGs/CollapseClosedIcon';

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
    <button className='button button-b button-codepen'>Edit on Codepen</button>
  </form>
)

// ===================================================
// Full snippet view (tags, code, title, description)
// ===================================================
const FullCard = ({ snippetData, isDarkMode }) => {
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

  React.useEffect(() => {
    if (!cardCodeJs) return;
    let jsTitle = `${snippetData.title.toLowerCase().replace(/[\s-]/g, '')}_js`;
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.innerHTML = `function ${jsTitle}(){${snippetData.code.js}};`;
    document.body.appendChild(s);
    try { window[`${jsTitle}`](); } catch (e) { }
  }, []);

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
          className={`card-code language-${config.secondLanguage.short}`}
          dangerouslySetInnerHTML={{ __html: cardCodeHtml }}
        />
        <h5 className='card-section-title card-section-css'>CSS</h5>
        <pre
          className={`card-code language-${config.language.short}`}
          dangerouslySetInnerHTML={{ __html: cardCodeCss }}
        />
        {
          cardCodeJs && <>
            <h5 className='card-section-title card-section-js'>JavaScript</h5>
            <pre
              className={`card-code language-${config.optionalLanguage.short}`}
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
              {`function jsTitle(){${snippetData.code.js}};`}
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
        <p className='browser-support-data'>{snippetData.supportPercentage.toFixed(1)}%</p>
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
  isDarkMode
}) => {
  React.useEffect(() => {
    if (!snippetData.code.js) return;
    let jsTitle = `${snippetData.title.toLowerCase().replace(/[\s-]/g, '')}_js`;
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.innerHTML = `function ${jsTitle}(){${snippetData.code.js}};`;
    document.body.appendChild(s);
    try { window[`${jsTitle}`](); } catch (e) { }
  }, []);

  return (
    <div className='card short'>
      <h4 className='card-title'>
      <Link to={`/snippet/${snippetData.id}`} className='clickable-card-wrapper' rel='canonical'>
        {snippetData.title}
      </Link>
      </h4>
      <div
        className='card-description'
        dangerouslySetInnerHTML={{
          __html: `${getTextualContent(snippetData.html)}`,
        }}
      />
      <div className='card-bottom'>
        <h5 className='card-section-demo-title'>Demo</h5>
        <div className='card-snippet-demo' data-scope={snippetData.id.replace(/\//g,'')}>
          <style>
            {snippetData.code.scopedCss}
          </style>
          <div dangerouslySetInnerHTML={{ __html: snippetData.code.html }} />
        </div>
        <p className='snippet-view'><Link to={`/snippet/${snippetData.id}`} className='button button-b button-view' rel='canonical'>View snippet</Link></p>
      </div>
    </div>
  );
};

export default SnippetCard;
