"use strict";

module.exports = (state = [], action) => {
  switch (action.type) {
    case `SET_SITE_FLATTENED_PLUGINS`:
      return [...action.payload];

    default:
      return state;
  }
};
//# sourceMappingURL=flattened-plugins.js.map