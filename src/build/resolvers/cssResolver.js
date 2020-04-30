import {
  optimizeAllNodes
} from 'utils';

/** Get the textual content in a gatsby page */
const getTextualContent = (str, noExplain = false) => {
  const result = str
    .slice(0, str.indexOf('<div class="gatsby-highlight"'))
    .replace(/(href="https?:\/\/)/g, 'target="_blank" rel="nofollow noopener noreferrer" $1');
  if (noExplain)
    return result.slice(0, result.indexOf('</p>\n') + 4);

  return result;
};

/** Get the code blocks in a gatsby page */
const getCodeBlocks = str => {
  const regex = /<pre[.\S\s]*?<\/pre>/g;
  let results = [];
  let m = null;
  while ((m = regex.exec(str)) !== null) {
    if (m.index === regex.lastIndex) regex.lastIndex += 1;
    // eslint-disable-next-line
    m.forEach((match, groupIndex) => {
      results.push(match);
    });
  }
  const cssReplacer = new RegExp(
    `<pre class="language-css"><code class="language-css">([\\s\\S]*?)</code></pre>`,
    'g'
  );
  const htmlReplacer = new RegExp(
    `<pre class="language-html"><code class="language-html">([\\s\\S]*?)</code></pre>`,
    'g'
  );
  const jsReplacer = new RegExp(
    `<pre class="language-js"><code class="language-js">([\\s\\S]*?)</code></pre>`,
    'g'
  );
  results = results.map(v =>
    v
      .replace(cssReplacer, '$1')
      .replace(htmlReplacer, '$1')
      .replace(jsReplacer, '$1')
      .trim()
  );
  if (results.length > 2) {
    return {
      html: results[0],
      css: results[1],
      js: results[2],
    };
  }
  return {
    html: results[0],
    css: results[1],
    js: '',
  };
};

export default str => {
  const description = getTextualContent(str, true);
  const fullDescription = getTextualContent(str, false);
  const codeBlocks = getCodeBlocks(str);
  return {
    description,
    fullDescription,
    htmlCode: `${optimizeAllNodes(codeBlocks.html)}`,
    cssCode: `${optimizeAllNodes(codeBlocks.css)}`,
    jsCode: codeBlocks.js ? `${optimizeAllNodes(codeBlocks.js)}` : '',
  };
}
;
