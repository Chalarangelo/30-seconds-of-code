"use strict";

module.exports = (state = new Map(), action) => {
  switch (action.type) {
    case `DELETE_CACHE`:
    case `CREATE_NODE`:
    case `DELETE_NODE`:
    case `DELETE_NODES`:
      return new Map();

    case `SET_RESOLVED_NODES`:
      {
        const {
          key,
          nodes
        } = action.payload;
        state.set(key, nodes);
        return state;
      }

    default:
      return state;
  }
};
//# sourceMappingURL=resolved-nodes.js.map