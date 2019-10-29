import {
  optimizeAllNodes
} from 'functions/utils';

/** Get the textual content in a gatsby page */
const getTextualContent = (str, noExplain = false) => {
  const result = str.slice(0, str.indexOf('<div class="gatsby-highlight"'));
  if (noExplain)
    return result.slice(0, result.lastIndexOf('<p>'));
  return result;
};

/** Gets the code blocks in a gatsby page */
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
    `<pre class="language-[^"]+"><code class="language-[^"]+">([\\s\\S]*?)</code></pre>`,
    'g'
  );
  results = results.map(v => v.replace(replacer, '$1').trim());
  return {
    code: results[0],
    example: results[1],
  };
};

export default str => {
  const description = getTextualContent(str, true);
  const fullDescription = getTextualContent(str, false);
  const codeBlocks = getCodeBlocks(str);
  return {
    description,
    fullDescription,
    code: `${optimizeAllNodes(codeBlocks.code)}`,
    example: `${optimizeAllNodes(codeBlocks.example)}`,
  };
}
;