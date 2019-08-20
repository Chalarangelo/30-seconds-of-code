"use strict";

module.exports = (state = new Map(), action) => {
  switch (action.type) {
    case `DELETE_CACHE`:
      return new Map();

    case `CREATE_NODE`:
      {
        state.set(action.payload.id, action.payload);
        return state;
      }

    case `ADD_FIELD_TO_NODE`:
    case `ADD_CHILD_NODE_TO_PARENT_NODE`:
      state.set(action.payload.id, action.payload);
      return state;

    case `DELETE_NODE`:
      {
        if (action.payload) {
          state.delete(action.payload.id);
        }

        return state;
      }

    case `DELETE_NODES`:
      {
        action.payload.forEach(id => state.delete(id));
        return state;
      }

    default:
      return state;
  }
};
//# sourceMappingURL=nodes.js.map