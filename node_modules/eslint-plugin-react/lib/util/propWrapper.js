/**
 * @fileoverview Utility functions for propWrapperFunctions setting
 */

'use strict';

function getPropWrapperFunctions(context) {
  return new Set(context.settings.propWrapperFunctions || []);
}

function isPropWrapperFunction(context, name) {
  if (typeof name !== 'string') {
    return false;
  }
  const propWrapperFunctions = getPropWrapperFunctions(context);
  const splitName = name.split('.');
  return Array.from(propWrapperFunctions).some((func) => {
    if (splitName.length === 2 && func.object === splitName[0] && func.property === splitName[1]) {
      return true;
    }
    return name === func || func.property === name;
  });
}

module.exports = {
  getPropWrapperFunctions,
  isPropWrapperFunction
};
