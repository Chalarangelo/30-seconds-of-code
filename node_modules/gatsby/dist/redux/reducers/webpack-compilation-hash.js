"use strict";

module.exports = (state = ``, action) => {
  switch (action.type) {
    case `SET_WEBPACK_COMPILATION_HASH`:
      return action.payload;

    default:
      return state;
  }
};
//# sourceMappingURL=webpack-compilation-hash.js.map