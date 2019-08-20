/**
 * @fileoverview Utility functions for propWrapperFunctions setting
 */

'use strict';

/** TODO: type {(string | { name: string, linkAttribute: string })[]} */
/** @type {any} */
const DEFAULT_LINK_COMPONENTS = ['a'];
const DEFAULT_LINK_ATTRIBUTE = 'href';

function getLinkComponents(context) {
  const settings = context.settings || {};
  const linkComponents = /** @type {typeof DEFAULT_LINK_COMPONENTS} */ (
    DEFAULT_LINK_COMPONENTS.concat(settings.linkComponents || [])
  );
  return new Map(linkComponents.map((value) => {
    if (typeof value === 'string') {
      return [value, DEFAULT_LINK_ATTRIBUTE];
    }
    return [value.name, value.linkAttribute];
  }));
}

module.exports = {
  getLinkComponents
};
