// TODO: Remove usage and package after update to Node.js v12.x
import matchAll from 'string.prototype.matchall';
import { optimizeAllNodes } from 'utils';

const codeBlockRegex = /<pre class="code-wrapper">([.\S\s]*?)<\/pre>/g;

export default str => {
  const textualContent = str
    .slice(0, str.indexOf('<div class="gatsby-highlight"'))
    .replace(/(href="https?:\/\/)/g, 'target="_blank" rel="nofollow noopener noreferrer" $1');
  const description = textualContent.slice(0, textualContent.indexOf('</p>\n') + 4);
  const fullDescription = textualContent;
  // TODO: Replace matchAll(str, regex) with str.matchAll(regex) after update to Node.js v12.x
  const codeBlocks = Array.from(
    matchAll(str, codeBlockRegex),
    m => optimizeAllNodes(m[1])
  );

  const codeBlocksObject = codeBlocks.length > 2
    ? {
      style: codeBlocks[0],
      code: codeBlocks[1],
      example: codeBlocks[2],
    } : {
      style: '',
      code: codeBlocks[0],
      example: codeBlocks[1],
    };

  return {
    description,
    fullDescription,
    ...codeBlocksObject,
  };
}
;
