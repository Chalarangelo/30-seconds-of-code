import React from 'react';
import { Link } from 'gatsby';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import config from '../../../config';

import { getTextualContent, getCodeBlocks, optimizeAllNodes } from '../util';
// import ShareIcon from './SVGs/ShareIcon';
import CollapseOpenIcon from './SVGs/CollapseOpenIcon';
import CollapseClosedIcon from './SVGs/CollapseClosedIcon';

// ===================================================
// Snippet Card HOC - check components below for more
// ===================================================
const SnippetCard = ({ short, snippetData, ...rest }) => {
  let difficulty = snippetData.tags.includes('advanced')
    ? 'advanced'
    : snippetData.tags.includes('beginner')
    ? 'beginner'
    : 'intermediate';
  return short ? (
    <ShortCard snippetData={snippetData} difficulty={difficulty} {...rest} />
  ) : (
    <FullCard snippetData={snippetData} difficulty={difficulty} {...rest} />
  );
};

// ===================================================
// Simple card corner for difficulty display
// ===================================================
const CardCorner = ({ difficulty = 'intermediate' }) => (
  <div
    className={`card-corner ${difficulty}`}
    aria-label={difficulty}
    title={difficulty}
  />
);

// ===================================================
// Full snippet view (tags, code, title, description)
// ===================================================
const FullCard = ({ snippetData, difficulty, isDarkMode }) => {
  const [examplesOpen, setExamplesOpen] = React.useState(false);
  const tags = snippetData.tags;
  let cardCodeHtml = `${optimizeAllNodes(
    getCodeBlocks(snippetData.html).code,
  )}`;
  let cardExamplesHtml = `${optimizeAllNodes(
    getCodeBlocks(snippetData.html).example,
  )}`;
  return (
    <div className='card'>
      <CardCorner difficulty={difficulty} />
      <h4 className='card-title'>{snippetData.title}</h4>
      {tags.map(tag => (
        <span className='tag' key={`tag_${tag}`}>{tag}</span>
      ))}
      <div
        className='card-description'
        dangerouslySetInnerHTML={{
          __html: `${getTextualContent(snippetData.html)}`,
        }}
      />
      <div className='card-bottom'>
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
        {/* <button className="button button-b button-social-sh" aria-label="Share">
          <ShareIcon />
        </button> */}
        <pre
          className={`card-code language-${config.language.short}`}
          dangerouslySetInnerHTML={{ __html: cardCodeHtml }}
        />
        <button
          className='button button-example-toggler'
          onClick={() => setExamplesOpen(!examplesOpen)}
        >
          {examplesOpen ? <CollapseOpenIcon /> : <CollapseClosedIcon />}Examples
        </button>
        {examplesOpen && (
          <pre
            className='section card-examples language-py'
            dangerouslySetInnerHTML={{ __html: cardExamplesHtml }}
          />
        )}
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
  difficulty,
  isDarkMode
}) => {
  let cardCodeHtml;
  if (withCode)
    cardCodeHtml = `${optimizeAllNodes(
      getCodeBlocks(snippetData.html).code,
    )}`;
  return (
    <Link to={`/snippet/${snippetData.id}`} rel='canonical' className='clickable-card-wrapper'>
      <div className='card short'>
        <CardCorner difficulty={difficulty} />
        <h4 className='card-title'>
          {snippetData.title}
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
            className={`card-code language-${config.language.short}`}
            dangerouslySetInnerHTML={{ __html: cardCodeHtml }}
          />
        </div> : '' }
      </div>
    </Link>
  );
};

export default SnippetCard;
