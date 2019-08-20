"use strict";

let mockResults = {};

module.exports = input => {
  // return a mocked result
  if (typeof input === `string`) {
    return mockResults[input];
  } // return default result


  if (typeof input !== `object`) {
    return [];
  } // set mock results


  mockResults = Object.assign({}, input);
  return undefined;
};
//# sourceMappingURL=resolve-module-exports.js.map