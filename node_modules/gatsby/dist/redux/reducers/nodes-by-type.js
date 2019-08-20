"use strict";

const getNodesOfType = (node, state) => {
  const {
    type
  } = node.internal;

  if (!state.has(type)) {
    state.set(type, new Map());
  }

  return state.get(type);
};

module.exports = (state = new Map(), action) => {
  switch (action.type) {
    case `DELETE_CACHE`:
      return new Map();

    case `CREATE_NODE`:
      {
        const node = action.payload;
        const nodesOfType = getNodesOfType(node, state);
        nodesOfType.set(node.id, node);
        return state;
      }

    case `ADD_FIELD_TO_NODE`:
    case `ADD_CHILD_NODE_TO_PARENT_NODE`:
      {
        const node = action.payload;
        const nodesOfType = getNodesOfType(node, state);
        nodesOfType.set(node.id, node);
        return state;
      }

    case `DELETE_NODE`:
      {
        const node = action.payload;
        if (!node) return state;
        const nodesOfType = getNodesOfType(node, state);
        nodesOfType.delete(node.id);

        if (!nodesOfType.size) {
          state.delete(node.internal.type);
        }

        return state;
      }
    // Deprecated, will be removed in Gatsby v3.

    case `DELETE_NODES`:
      {
        const ids = action.payload;
        ids.forEach(id => {
          Array.from(state).some(([type, nodes]) => {
            if (nodes.has(id)) {
              nodes.delete(id);

              if (!nodes.size) {
                state.delete(type);
              }

              return true;
            }

            return false;
          });
        });
        return state;
      }

    default:
      return state;
  }
};
//# sourceMappingURL=nodes-by-type.js.map