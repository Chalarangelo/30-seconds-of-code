const config = require('../../../config');

// Capitalizes the first letter of a string
const capitalize = (str, lowerRest = false) =>
  str.slice(0, 1).toUpperCase() +
  (lowerRest ? str.slice(1).toLowerCase() : str.slice(1));

// Get the textual content in a gatsby page
const getTextualContent = (str, noExplain = false) => {
  const result = str.slice(0, str.indexOf('<div class="gatsby-highlight"'));
  if (noExplain)
    return result.slice(0, result.lastIndexOf('<p>'));
  return result;
};

// Gets the code blocks in a gatsby page
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
  const replacer = new RegExp(
    `<pre class="language-${config.language.short}"><code class="language-${config.language.short}">([\\s\\S]*?)</code></pre>`,
    'g',
  );
  results = results.map(v => v.replace(replacer, '$1').trim());
  return {
    code: results[0],
    example: results[1],
  };
};

// Optimizes nodes in an HTML string
const optimizeNodes = (data, regexp, replacer) => {
  let count = 0;
  let output = data;
  do {
    output = output.replace(regexp, replacer);
    count = 0;
    while (regexp.exec(output) !== null) ++count;
  } while (count > 0);
  return output;
};
const optimizeAllNodes = html => {
  let output = html;
  // Optimize punctuation nodes
  output = optimizeNodes(
    output,
    /<span class="token punctuation">([^\0<]*?)<\/span>([\n\r\s]*)<span class="token punctuation">([^\0]*?)<\/span>/gm,
    (match, p1, p2, p3) =>
      `<span class="token punctuation">${p1}${p2}${p3}</span>`,
  );
  // Optimize operator nodes
  output = optimizeNodes(
    output,
    /<span class="token operator">([^\0<]*?)<\/span>([\n\r\s]*)<span class="token operator">([^\0]*?)<\/span>/gm,
    (match, p1, p2, p3) =>
      `<span class="token operator">${p1}${p2}${p3}</span>`,
  );
  // Optimize keyword nodes
  output = optimizeNodes(
    output,
    /<span class="token keyword">([^\0<]*?)<\/span>([\n\r\s]*)<span class="token keyword">([^\0]*?)<\/span>/gm,
    (match, p1, p2, p3) => `<span class="token keyword">${p1}${p2}${p3}</span>`,
  );
  return output;
};

// Gets the code blocks for a snippet file.
const getRawCodeBlocks = str => {
  const regex = /```[.\S\s]*?```/g;
  let results = [];
  let m = null;
  while ((m = regex.exec(str)) !== null) {
    if (m.index === regex.lastIndex) regex.lastIndex += 1;
    // eslint-disable-next-line
    m.forEach((match, groupIndex) => {
      results.push(match);
    });
  }
  const replacer = new RegExp(
    `\`\`\`${config.language.short}([\\s\\S]*?)\`\`\``,
    'g',
  );
  results = results.map(v => v.replace(replacer, '$1').trim());
  return {
    code: results[0],
    example: results[1],
  };
};

module.exports = {
  capitalize,
  getTextualContent,
  getCodeBlocks,
  optimizeNodes,
  optimizeAllNodes,
  getRawCodeBlocks,
};
