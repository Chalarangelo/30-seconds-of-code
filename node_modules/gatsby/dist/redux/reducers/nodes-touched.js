"use strict";

module.exports = (state = {}, action) => {
  switch (action.type) {
    case `CREATE_NODE`:
      state[action.payload.id] = true;
      return state;

    case `TOUCH_NODE`:
      state[action.payload] = true;
      return state;

    default:
      return state;
  }
};
//# sourceMappingURL=nodes-touched.js.map