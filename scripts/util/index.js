const {
  isTravisCI,
  isTravisCronOrAPI,
  isNotTravisCronOrAPI,
} = require('./environmentCheck');
const {
  getMarkDownAnchor,
  objectFromPairs,
  optimizeNodes,
  capitalize,
  prepTaggedData,
  makeExamples,
} = require('./helpers');
const {
  getFilesInDir,
  hashData,
  getCodeBlocks,
  getTextualContent,
  readSnippets,
} = require('./snippetParser');

module.exports = {
  isTravisCI,
  isTravisCronOrAPI,
  isNotTravisCronOrAPI,
  getMarkDownAnchor,
  objectFromPairs,
  optimizeNodes,
  capitalize,
  prepTaggedData,
  makeExamples,
  getFilesInDir,
  hashData,
  getCodeBlocks,
  getTextualContent,
  readSnippets,
};
