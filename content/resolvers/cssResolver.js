import {
  optimizeAllNodes
} from 'functions/utils';

/** Get the explanation for the snippet in the page. */
const getExplanation = str => {
  const regex = /<h4>\s*Explanation\s*<\/h4>([\s\S]*)<h4>/g;
  const results = [];
  let m = null;
  while ((m = regex.exec(str)) !== null) {
    if (m.index === regex.lastIndex) regex.lastIndex += 1;

    m.forEach((match, groupIndex) => {
      results.push(match);
    });
  }
  return results[1].replace(/\r\n/g, '\n');
};

/** Get the textual content in a gatsby page */
const getTextualContent = (str, noExplain = false) => {
  const description = str.slice(0, str.indexOf('<div class="gatsby-highlight"'));
  if (noExplain)
    return description;
  else
    return `${description}\n${getExplanation(str)}`;
};

/** Get the browser support for a snippet file */
const getBrowserSupport = str => {
  const regex = /<h4>\s*Browser [s|S]upport\s*<\/h4>([\s\S]*)/g;
  const results = [];
  let m = null;
  while ((m = regex.exec(str)) !== null) {
    if (m.index === regex.lastIndex) regex.lastIndex += 1;

    m.forEach((match, groupIndex) => {
      results.push(match);
    });
  }
  return results[1].replace(/\r\n/g, '\n');
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
  const browserSupport = getBrowserSupport(str);
  const codeBlocks = getCodeBlocks(str);
  return {
    description,
    fullDescription,
    browserSupport,
    htmlCode: `${optimizeAllNodes(codeBlocks.html)}`,
    cssCode: `${optimizeAllNodes(codeBlocks.css)}`,
    jsCode: codeBlocks.js ? `${optimizeAllNodes(codeBlocks.js)}` : '',
  };
}
;
