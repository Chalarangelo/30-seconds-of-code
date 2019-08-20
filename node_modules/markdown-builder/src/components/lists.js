/**
 * Markdown Lists utilities
 * @flow
 */

import { UNORDERED_LIST_PREFIX, withPrefix } from '../util';

const ul = (items: Array<any>, callback: Function): string => {
  let list = '';
  for (let val of items) {
    if (callback) {
      list += withPrefix(UNORDERED_LIST_PREFIX, callback(val)) + '\n';
    } else {
      list += withPrefix(UNORDERED_LIST_PREFIX, val) + '\n';
    }
  }
  return list;
};

const ol = (items: Array<any>, callback: Function): string => {
  let list = '';
  let counter = 1;

  for (let val of items) {
    if (callback) {
      list += withPrefix(`${counter}.`, callback(val)) + '\n';
    } else {
      list += withPrefix(`${counter}.`, val) + '\n';
    }
    counter++;
  }
  return list;
};

export { ul, ol };
