import {
  capitalize,
  stripMarkdownFormat,
  trimWhiteSpace,
  optimizeNodes,
  optimizeAllNodes,
  getURLParameters,
  getBaseURL
} from './string';

import {
  mapNumRange
} from './math';

import {
  determineExpertiseFromTags,
  stripExpertiseFromTags,
  transformSnippetIndex,
  uniqueElements,
  similarity,
  chunk
} from './array';

import {
  throttle
} from './function';

export {
  capitalize,
  trimWhiteSpace,
  stripMarkdownFormat,
  optimizeNodes,
  optimizeAllNodes,
  determineExpertiseFromTags,
  stripExpertiseFromTags,
  mapNumRange,
  getURLParameters,
  getBaseURL,
  throttle,
  transformSnippetIndex,
  uniqueElements,
  similarity,
  chunk
};
