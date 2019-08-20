"use strict";

module.exports = (state = {}, action) => {
  switch (action.type) {
    case `SET_RESOLVED_THEMES`:
      return Object.assign({}, state, {
        themes: action.payload
      });

    default:
      return state;
  }
};
//# sourceMappingURL=themes.js.map