"use strict";

const _ = require(`lodash`);

module.exports = (state = [], action) => {
  switch (action.type) {
    case `CREATE_REDIRECT`:
      {
        if (!state.some(redirect => _.isEqual(redirect, action.payload))) {
          // Add redirect only if it wasn't yet added to prevent duplicates
          return [...state, action.payload];
        }

        return state;
      }

    default:
      return state;
  }
};
//# sourceMappingURL=redirects.js.map