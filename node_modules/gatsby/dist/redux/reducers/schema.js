"use strict";

module.exports = (state = {}, action) => {
  switch (action.type) {
    case `SET_SCHEMA`:
      return action.payload;

    default:
      return state;
  }
};
//# sourceMappingURL=schema.js.map