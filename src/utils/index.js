import {
  capitalize,
  toKebabCase,
  convertToSeoSlug,
  addTrailingSlashToSlug,
  escapeHTML,
  stripMarkdownFormat,
  optimizeNodes,
  optimizeAllNodes,
  getURLParameters,
  getRootURL,
  getBaseURL,
} from './string';

import combineClassNames from '@chalarangelo/combine-class-names';

import { uniqueElements, insertAt, chunk } from './array';

import { throttle } from './function';

import { generateStructuredData, hasKeys, hasKey, get } from './object';

export {
  capitalize,
  toKebabCase,
  convertToSeoSlug,
  addTrailingSlashToSlug,
  combineClassNames,
  escapeHTML,
  stripMarkdownFormat,
  optimizeNodes,
  optimizeAllNodes,
  getURLParameters,
  getBaseURL,
  getRootURL,
  throttle,
  generateStructuredData,
  hasKeys,
  hasKey,
  get,
  uniqueElements,
  insertAt,
  chunk,
};
