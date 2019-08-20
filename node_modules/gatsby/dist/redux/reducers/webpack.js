"use strict";

const merge = require(`webpack-merge`);

module.exports = (state = {}, action) => {
  switch (action.type) {
    case `SET_WEBPACK_CONFIG`:
      {
        let nextConfig = action.payload;
        delete nextConfig.entry;
        delete nextConfig.output;
        delete nextConfig.target;
        delete nextConfig.resolveLoaders;
        return merge(state, nextConfig);
      }

    case `REPLACE_WEBPACK_CONFIG`:
      return Object.assign({}, action.payload);

    default:
      return state;
  }
};
//# sourceMappingURL=webpack.js.map