"use strict";

module.exports = function replaceStringWithRegex(object) {
  Object.keys(object).forEach(propName => {
    if (typeof object[propName] === `string`) {
      try {
        object[propName] = new RegExp(object[propName]);
      } catch (e) {
        console.warn(`Invalid RegEx: `, object[propName]);
      }
    }

    if (object[propName] instanceof Object && !(object[propName] instanceof Array)) {
      object[propName] = replaceStringWithRegex(object[propName]);
    }
  });
  return object;
};